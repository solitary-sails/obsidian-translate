import {ItemView, Scope, WorkspaceLeaf} from "obsidian";
import type TranslatorPlugin from "./main";

import type {SvelteComponent} from "svelte";
import {ViewPage} from "./ui/translator-components";

import {TRANSLATOR_VIEW_ID} from "./constants";


export class TranslatorView extends ItemView {
	plugin: TranslatorPlugin;
	private view: SvelteComponent;

	constructor(leaf: WorkspaceLeaf, plugin: TranslatorPlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType() {
		return TRANSLATOR_VIEW_ID;
	}

	getDisplayText() {
		return "Translator";
	}

	getIcon(): string {
		return "translate";
	}


	async onOpen() {
		this.contentEl.empty();
		this.contentEl.id = "translator-view";

		this.view = new ViewPage({
			target: this.contentEl,
			props: {
				plugin: this.plugin,
				settings: this.plugin.settings,
				data: this.plugin.plugin_data,
			}
		});
	}

	async onClose() {
		this.view.$destroy();
		this.containerEl.detach()
	}

	onResize() {
		const rectangle = this.contentEl.getBoundingClientRect();
		this.view.onResize(rectangle.width, rectangle.height);
	}
}
