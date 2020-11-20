import { Plugin, Notice, addIcon } from "obsidian"
import ExtractHighlightsPluginSettings from "./ExtractHighlightsPluginSettings"
import ExtractHighlightsPluginSettingsTab from "./ExtractHighlightsPluginSettingsTab"

addIcon('target', '<path d="M50 88C29.0132 88 12 70.9868 12 50C12 29.0132 29.0132 12 50 12C70.9868 12 88 29.0132 88 50C87.9761 70.9769 70.9769 87.9761 50 88ZM50 22.8571C35.0094 22.8571 22.8571 35.0094 22.8571 50C22.8571 64.9906 35.0094 77.1429 50 77.1429C64.9906 77.1429 77.1429 64.9906 77.1429 50C77.1429 35.0094 64.9906 22.8571 50 22.8571ZM50 66.2857C41.0056 66.2857 33.7143 58.9943 33.7143 50C33.7143 41.0056 41.0056 33.7143 50 33.7143C58.9943 33.7143 66.2857 41.0056 66.2857 50C66.2857 54.3192 64.5699 58.4616 61.5157 61.5157C58.4616 64.5699 54.3192 66.2857 50 66.2857Z" fill="#646464"/>')

export default class ExtractHighlightsPlugin extends Plugin {

	public settings: ExtractHighlightsPluginSettings;
	public statusBar: HTMLElement

	async onload() {
		this.loadSettings();
		this.addSettingTab(new ExtractHighlightsPluginSettingsTab(this.app, this));

		this.statusBar = this.addStatusBarItem()

		this.addRibbonIcon('target', 'Extract Highlights', () => {
			this.extractHighlights();
		});

		this.addCommand({
			id: "shortcut-highlights",
			name: "Shortcut for extracting highlights",
			callback: () => this.extractHighlights(),
			hotkeys: [
				{
					modifiers: ["Alt", "Shift"],
					key: "±",
				},
			],
		});
	}
	loadSettings() {
		this.settings = new ExtractHighlightsPluginSettings();
		(async () => {
		  const loadedSettings = await this.loadData();
		  if (loadedSettings) {
			console.log("Found existing settings file");
			this.settings.headlineText = loadedSettings.headlineText;
		  } else {
			console.log("No settings file found, saving...");
			this.saveData(this.settings);
		  }
		})();
	}

	extractHighlights(): void {

		let activeLeaf: any = this.app.workspace.activeLeaf ?? null

		try {
			if (activeLeaf?.view?.data) {
				let highlights = this.processHighlights(activeLeaf.view.data);
				let saveStatus = this.saveToClipboard(highlights);
				new Notice(saveStatus);
			} else {
				new Notice("No highlights to extract.");
			}
		} catch (e) {
			console.log(e.message)
		}
	}

	processHighlights(data: string): string {
		let re = /(==|\<mark\>)([\s\S]*?)(==|\<\/mark\>)/g;
		let matches = data.match(re);

		console.log(matches.length);

		var result = "";

		if (matches != null) {
			if(this.settings.headlineText != "") { 
				result += `## ${this.settings.headlineText}\n`;
			}

			for (let entry of matches) {
				var removeNewline = entry.replace(/\n/g, " ");
				let removeHighlightStart = removeNewline.replace(/==/g, "")
				let removeHighlightEnd = removeHighlightStart.replace(/\<mark\>/g, "")
				let removeMarkClosing = removeHighlightEnd.replace(/\<\/mark\>/g, "")

				result += " - " + removeMarkClosing + "\n";
			}
		}

		return result;
	}

	saveToClipboard(data: string): string {
		if (data.length > 0) {
			navigator.clipboard.writeText(data);
			return "Highlights copied to clipboard!";
		} else {
			return "No highlights found";
		}
	}
}
