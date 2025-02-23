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

export class LibreTranslate extends DummyTranslate {
	#host: string;
	id = "libre_translate";

	constructor(settings: ServiceSettings) {
		super();
		this.#host = settings.host;
	}

	update_settings(settings: ServiceSettings): void {
		this.#host = settings.host ?? this.#host;
	}

	async service_validate(): Promise<ValidationResult> {
		if (!this.#host)
			return {status_code: 400, valid: false, message: "Host was not specified"};

		const response = await requestUrl({
			throw: false,
			method: "GET",
			url: `${this.#host}/languages`,
		});

		const data = response.json;
		return {
			status_code: response.status,
			valid: response.status === 200,
			message: data.error
		};
	}

	async service_detect(text: string): Promise<DetectionResult> {
		const response = await requestUrl({
			throw: false,
			method: "POST",
			url: `${this.#host}/detect`,
			body: JSON.stringify({q: text}),
			headers: {"Content-Type": "application/json"}
		});


		const data = response.json;
		if (response.status !== 200)
			return {status_code: response.status, message: data.error}

		return {
			status_code: response.status,
			detected_languages: response.status === 200 ? [{
				language: data[0].language,
				confidence: data[0].confidence / 100
			}] : undefined
		};
	}

	async service_translate(text: string, from: string, to: string, options: ServiceOptions = {}): Promise<TranslationResult> {
		const response = await requestUrl({
			throw: false,
			method: "POST",
			url: `${this.#host}/translate`,
			body: JSON.stringify({
				q: text,
				source: from,
				target: to
			}),
			headers: {"Content-Type": "application/json"}
		});

		const data = response.json;
		if (response.status !== 200)
			return {status_code: response.status, message: data.error}

		return {
			status_code: response.status,
			translation: data.translatedText,
			detected_language: (from === "auto" && data.detectedLanguage.language ? data.detectedLanguage.language : undefined)
		};
	}

	async service_languages(): Promise<LanguagesFetchResult> {
		const response = await requestUrl({
			throw: false,
			method: "GET",
			url: `${this.#host}/languages`,
		});

		const data = response.json;
		if (response.status !== 200)
			return {status_code: response.status, message: data.error}

		return {
			status_code: response.status,
			languages: response.status === 200 ? Array.from(data).map((x: any) => x.code) : undefined
		};
	}

	has_autodetect_capability(): boolean {
		return true;
	}
}
