// Abandoned until I can figure out how the hell Amazon's REST API works (or how it doesn't)

import {DummyTranslate} from "./dummy-translate";
import type {
	ServiceSettings,
	DetectionResult,
	LanguagesFetchResult,
	TranslationResult,
	ValidationResult,
	ServiceOptions
} from "./types";

export class AmazonTranslate extends DummyTranslate {
	#api_key: string;
	#region: string;
	id = "amazon_translate";

	character_limit = 5000;

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

		// Will not contribute to character quota, as it's translating to the same language
		const response = await fetch(`https://translate.${this.#region}.amazonaws.com/TranslateText`, {
			body: JSON.stringify({
				Text: 'I',
				SourceLanguageCode: 'en',
				TargetLanguageCode: 'en',
			}),
			headers: {
				'Action': 'TranslateText',
				'Version': '2017-07-01',
				'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
				'X-Amz-Date': new Date().toISOString().replace(/[:\-]|\.\d{3}/g, ''),
				'Content-Type': 'application/x-amz-json-1.1',
				'X-Amz-Target': `AWSShineFrontendService_20170701.TranslateText`,
			},
		});

		const data = await response.json();
		return {
			valid: response.ok,
			status_code: response.status
		};
	}


	async service_detect(text: string): Promise<DetectionResult> {
		let result = await this.service_translate(text, 'auto', 'en');
		return {detected_languages: [{language: result.detected_language}], status_code: result.status_code};
	}

	async service_translate(text: string, from: string, to: string, options: ServiceOptions = {}): Promise<TranslationResult> {
		const response = await fetch(`https://translate.${this.#region}.amazonaws.com/TranslateText`, {
			body: JSON.stringify({
				Text: text,
				SourceLanguageCode: from,
				TargetLanguageCode: to,
			}),
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
		});

		// Data = {"AppliedSettings": {"Formality": "...", "Profanity": "..."},
		// 		   "AppliedTerminologies": [{"Name": "...", "Terms": [{"SourceText": "...", "TargetText": "..."}, ...]}, ...],
		// 		   "SourceLanguageCode": "en", "TargetLanguageCode": "fr", "TranslatedText": "..."}
		// }
		const data = await response.json();
		if (response.status !== 200)
			return { status_code: response.status };

		return {
			status_code: response.status,
			translation: data.TranslatedText,
			detected_language: (from === "auto" &&  data.SourceLanguageCode) ? data.SourceLanguageCode : null,
		};
	}

	async service_languages(): Promise<LanguagesFetchResult> {
		const response = await fetch(`https://translate.${this.#region}.amazonaws.com/ListLanguages`, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
		});

		// Data = {"DisplayLanguageCode": "en", "Languages": [{"LanguageCode": "en", "LanguageName": "English"}, ...], "NextToken": "..."}
		const data = await response.json();

		if (response.status !== 200)
			return {status_code: response.status};

		return {
			status_code: response.status,
			languages: data.Languages.map((l: { LanguageCode: any; LanguageName: any; }) => l.LanguageCode)
		};
	}

	has_autodetect_capability(): boolean {
		return true;
	}
}
