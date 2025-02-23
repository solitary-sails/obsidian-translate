import {DummyTranslate} from "./dummy-translate";
import type {
	ServiceSettings,
	DetectionResult,
	LanguagesFetchResult,
	TranslationResult,
	ValidationResult,
	ServiceOptions
} from "./types";
import {TextDecoder} from "util";
import type {RequestUrlResponse} from "obsidian";
import {requestUrl} from "obsidian";
import {DEFAULT_SETTINGS} from "../constants";

export class FanyiQq extends DummyTranslate {
	#api_key: string;
	#app_id: string;
	#region: string;
	id = "fanyi_qq";

	character_limit = 2000;

	constructor(settings: ServiceSettings) {
		super();
		this.#api_key = settings.api_key;
		this.#app_id = settings.app_id;
		this.#region = settings.region;
	}

	update_settings(settings: ServiceSettings): void {
		this.#api_key = settings.api_key ?? this.#api_key;
		this.#app_id = settings.app_id ?? this.#app_id;
		this.#region = settings.region ?? this.#region;
	}


	async sign_message(payload: any) {
		// Returns hex string of SHA-256 hash of message
		async function hash_string(str: string, encoding: string = 'hex') {
			const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
			const buffer = new Uint8Array(digest);
			if (encoding === 'hex')
				return Array.from(buffer).map((b) => b.toString(16).padStart(2, "0")).join("");
			else
				return new TextDecoder().decode(buffer);
		}

		// Returns hex string of HMAC-SHA-256 hash of message and key
		async function hmac_hash_string(str: string, key: string, encoding: string = '') {
			const encoder = new TextEncoder();

			const imported_key = await crypto.subtle.importKey('raw', encoder.encode(key), {
				name: 'HMAC',
				hash: 'SHA-256'
			}, false, ['sign', 'verify']);
			const digest = await crypto.subtle.sign('HMAC', imported_key, encoder.encode(str));
			const buffer = new Uint8Array(digest);
			if (encoding === 'hex')
				return Array.from(buffer).map((b) => b.toString(16).padStart(2, "0")).join("");
			else
				return new TextDecoder().decode(buffer);
		}

		const date = new Date();
		const timestamp = (date.getTime() / 1000).toFixed(0);
		const full_date = `${date.getUTCFullYear()}-${('0' + (date.getUTCMonth() + 1)).slice(-2)}-${('0' + date.getUTCDate()).slice(-2)}`;

		const version = "2018-03-21";
		const signed_headers = "content-type;host";
		const hashed_payload = await hash_string(JSON.stringify(payload));
		const http_request_method = 'POST';
		const canonical_uri = '/';
		const canonical_querystring = '';
		const canonical_headers = ['content-type:application/json', `host:tmt.tencentcloudapi.com`].join('\n');
		const canonical_request = [http_request_method, canonical_uri, canonical_querystring, canonical_headers, signed_headers, hashed_payload].join('\n');
		const hashed_canonical_request = await hash_string(canonical_request);
		const credential_scope = `${full_date}/tmt/tc3_request`;
		const message_string = ['TC3-HMAC-SHA256', timestamp, credential_scope, hashed_canonical_request].join('\n');

		const keyed_date = await hmac_hash_string(full_date, 'TC3' + this.#api_key);
		const keyed_service = await hmac_hash_string('tmt', keyed_date);
		const keyed_signing = await hmac_hash_string('tc3_request', keyed_service);
		const signature = await hmac_hash_string(message_string, keyed_signing, 'hex');

		const authorization = [
			'TC3-HMAC-SHA256 Credential=' + this.#api_key + '/' + credential_scope,
			'SignedHeaders=' + signed_headers,
			'Signature=' + signature
		].join(', ');

		return {
			authorization: authorization,
			timestamp: timestamp.toString(),
		}
	}

	async service_validate(): Promise<ValidationResult> {
		if (!this.#api_key)
			return {status_code: 400, valid: false, message: "API key was not specified"};
		if (!this.#app_id)
			return {status_code: 400, valid: false, message: "App ID was not specified"};

		const payload = {
			Action: 'LanguageDetect',
			Version: '2018-03-21',
			Region: this.#region,
			Text: 'I',
			ProjectId: this.#app_id,
		}
		const signature = await this.sign_message(payload);

		const response = await requestUrl({
			throw: false,
			url: `https://tmt.tencentcloudapi.com/?` + new URLSearchParams(payload), method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': signature.authorization,
				'X-TC-Timestamp': signature.timestamp,
				'X-TC-Action': 'LanguageDetect',
				'X-TC-Version': '2018-03-21',
			}
		});

		const data = response.json;
		const status_code = data.Response.Error ? 400 : response.status;

		return {
			status_code: status_code,
			valid: status_code === 200,
			message: data.Response.Error?.Message
		};
	}


	async service_detect(text: string): Promise<DetectionResult> {
		const payload = {
			Action: 'LanguageDetect',
			Version: '2018-03-21',
			Region: this.#region,
			Text: text,
			ProjectId: this.#app_id,
		}
		const signature = await this.sign_message(payload);

		const response = await requestUrl({
			throw: false,
			url: `https://tmt.tencentcloudapi.com/?` + new URLSearchParams(payload), method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': signature.authorization,
				'X-TC-Timestamp': signature.timestamp,
				'X-TC-Action': 'LanguageDetect',
				'X-TC-Version': '2018-03-21',
			}
		});

		// Data = {"Response": {"Lang":"en", "RequestId": "..." } }
		const data = response.json;
		if (response.status !== 200)
			return {status_code: response.status, message: data.Response.Error.Message};

		return {
			status_code: response.status,
			detected_languages: [{language: data.Response.Lang}]
		};
	}

	async attempt_translation(sourceText: string, source: string, target: string): Promise<RequestUrlResponse> {
		// const attempt_translation: (sourceText: string, target: string) => Promise<RequestUrlResponse> = async (sourceText: string, target: string) => {
		const payload = {
			Action: 'TextTranslate',
			Version: '2018-03-21',
			Region: this.#region,
			SourceText: sourceText,
			Source: source,
			Target: target,
			ProjectId: this.#app_id,
		}
		const signature = await this.sign_message(payload);

		return requestUrl({
			throw: false,
			url: `https://tmt.tencentcloudapi.com/?` + new URLSearchParams(payload), method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': signature.authorization,
				'X-TC-Timestamp': signature.timestamp,
				'X-TC-Action': 'TextTranslate',
				'X-TC-Version': '2018-03-21',
			}
		});
	}

	async service_translate(text: string, from: string, to: string, options: ServiceOptions = {}): Promise<TranslationResult> {
		let response = await this.attempt_translation(text, from, to);

		// Data = {"Response": {"TargetText":"Hello", "Source":"en", "Target":"zh", "RequestId": "..." } }
		let data = response.json;
		if (response.status !== 200 || data.Response.Error) {
			if (data.Response.Error.Code === 'UnsupportedOperation.UnsupportedSourceLanguage') {
				// TODO: Warn user of doubled character usage due to indirect translation via pivoting
				// Use English as the pivot language (as QQ does not support translation between all language pairs)
				response = await this.attempt_translation(text, from, 'en');
				data = response.json;

				// If translation via pivot fails, exit
				if (response.status !== 200 || data.Response.Error)
					return {
						status_code: response.status !== 200 ? response.status : 400,
						message: data.Response.Error.Message
					};

				response = await this.attempt_translation(data.Response.TargetText, 'en', to);
				data = response.json;

				if (response.status !== 200 || data.Response.Error)
					return {
						status_code: response.status !== 200 ? response.status : 400,
						message: data.Response.Error.Message
					};
			} else {
				return {
					status_code: response.status !== 200 ? response.status : 400,
					message: data.Response.Error.Message
				};
			}
		}

		let detected_language = data.Response.Source;
		return {
			status_code: response.status,
			translation: data.Response.TargetText,
			detected_language: (from === "auto" && detected_language) ? detected_language : null
		};
	}

	async service_languages(): Promise<LanguagesFetchResult> {
		// TODO: Figure out if QQ has an endpoint for getting the current languages
		return {
			status_code: 200,
			languages: DEFAULT_SETTINGS.service_settings.fanyi_qq.available_languages
		}
	}

	has_autodetect_capability(): boolean {
		return true;
	}
}
