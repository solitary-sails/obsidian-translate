import {DummyTranslate} from "./dummy-translate";
import type {
	ServiceSettings,
	DetectionResult,
	LanguagesFetchResult,
	TranslationResult,
	ValidationResult,
	ServiceOptions
} from "./types";
import {requestUrl} from "obsidian";

export class AzureTranslator extends DummyTranslate {
	#api_key: string;
	#region: string;
	id = "azure_translator";

	character_limit = 50000;

	// Maximum 33300 characters per minute for F0 tier
	wait_time = 60000;

	constructor(settings: ServiceSettings) {
		super();
		this.#api_key = settings.api_key;
		this.#region = settings.region;
	}

	update_settings(settings: ServiceSettings): void {
		this.#api_key = settings.api_key ?? this.#api_key;
		this.#region = settings.region ?? this.#region;
	}


	async service_validate(): Promise<ValidationResult> {
		if (!this.#api_key)
			return {status_code: 400, valid: false, message: "API key was not specified"};

		// TODO: Check if there is a better way to validate the API key
		const headers: any = {
			"Content-Type": "application/json",
			"Ocp-Apim-Subscription-Key": this.#api_key,
		}
		if (this.#region)
			headers["Ocp-Apim-Subscription-Region"] = this.#region;

		const response = await requestUrl({
			throw: false,
			method: "POST",
			url:`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&` +
				new URLSearchParams({
					from: "",
					to: "en",
					textType: "plain"
				}),
			headers: headers,
			body: JSON.stringify([{Text: ''}]),
		});

		const data = response.json;

		return {
			status_code: response.status,
			valid: response.status === 200,
			message: data.error?.message
		};

	}

	async service_detect(text: string): Promise<DetectionResult> {
		const headers: any = {
			"Content-Type": "application/json",
			"Ocp-Apim-Subscription-Key": this.#api_key,
		}
		if (this.#region)
			headers["Ocp-Apim-Subscription-Region"] = this.#region;

		const response = await requestUrl({
			throw: false,
			method: "POST",
			url:`https://api.cognitive.microsofttranslator.com/detect?api-version=3.0&scope=text` +
				new URLSearchParams({
					textType: "plain"
				}),
			headers: headers,
			body: JSON.stringify([{Text: text}]),
		});


		const data = response.json;
		if (response.status !== 200)
			return {status_code: response.status, message: data.error.message}

		let results = [{language: data[0].language, confidence: data[0].score}];
		if (data[0].alternatives)
			results = results.concat(data[0].alternatives.map((alternative: any) => ({
				language: alternative.language,
				confidence: alternative.score
			})));

		return {
			status_code: response.status,
			detected_languages: results
		};
	}

	async service_translate(text: string, from: string, to: string, options: ServiceOptions = {}): Promise<TranslationResult> {
		const headers: any = {
			"Content-Type": "application/json",
			"Ocp-Apim-Subscription-Key": this.#api_key,
		}
		if (this.#region)
			headers["Ocp-Apim-Subscription-Region"] = this.#region;

		let profanity_action = "NoAction";
		if (options.profanity_filter.action === "mark")
			profanity_action = "Marked";
		else if (options.profanity_filter.action === "delete")
			profanity_action = "Deleted";
		let profanity_mark = undefined;
		if (options.profanity_filter.marker === "mask")
			profanity_mark = "Asterisk";
		else if (options.profanity_filter.marker === "html-tag")
			profanity_mark = "Tag";



		const response = await requestUrl({
			throw: false,
			method: "POST",
			url:`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&` +
				new URLSearchParams({
					from: from === "auto" ? "" : from,
					to: to,
					textType: "plain",
					allowFallback: "true",
					profanityAction: profanity_action,
					profanityMarker: profanity_mark
				}),
			headers: headers,
			body: JSON.stringify([{Text: text}]),
		});

		const data = response.json;
		if (response.status !== 200)
			return {status_code: response.status, message: data.error.message};

		const detected_language = from === "auto" && data[0].detectedLanguage.language;

		return {
			status_code: response.status,
			translation: data[0].translations[0].text,
			detected_language: detected_language ? data[0].detectedLanguage.language : null,
			confidence: detected_language ? data[0].detectedLanguage.score : null
		};
	}

	// No API key required, service may be invalid
	async service_languages(): Promise<LanguagesFetchResult> {
		const response = await requestUrl({
			throw: false,
			method: "GET",
			url:`https://api.cognitive.microsofttranslator.com/languages?api-version=3.0&scope=translation`,
			headers: { "Content-Type": "application/json" },
		});

		const data = response.json;

		if (response.status !== 200)
			return {status_code: response.status, message: data.error.message}

		return {
			status_code: response.status,
			languages: Object.keys(data.translation)
		};
	}

	has_autodetect_capability(): boolean {
		return true;
	}

}
