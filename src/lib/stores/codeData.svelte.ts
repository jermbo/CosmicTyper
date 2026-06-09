class CodeDataStore {
	htmlCode = $state<string[]>([]);
	cssCode = $state<string[]>([]);

	reset() {
		this.htmlCode = [];
		this.cssCode = [];
	}

	pushHtml(lines: string[]) {
		this.htmlCode = [...this.htmlCode, ...lines];
	}

	pushCss(lines: string[]) {
		this.cssCode = [...this.cssCode, ...lines];
	}
}

export const codeData = new CodeDataStore();
