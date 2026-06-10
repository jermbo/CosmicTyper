class CodeDataStore {
	htmlCode = $state<string[]>([]);
	cssCode = $state<string[]>([]);

	// Index range of lines added by the most recent push, so the minimap can
	// flash exactly what just rendered. Replaced on each push so only the
	// newest lines highlight.
	recentHtml = $state<number[]>([]);
	recentCss = $state<number[]>([]);
	// Which pane changed most recently, so the minimap can reveal it.
	lastTouched = $state<'html' | 'css'>('html');

	reset() {
		this.htmlCode = [];
		this.cssCode = [];
		this.recentHtml = [];
		this.recentCss = [];
		this.lastTouched = 'html';
	}

	pushHtml(lines: string[]) {
		const start = this.htmlCode.length;
		this.htmlCode.push(...lines);
		this.recentHtml = lines.map((_, i) => start + i);
		this.recentCss = [];
		this.lastTouched = 'html';
	}

	pushCss(lines: string[]) {
		const start = this.cssCode.length;
		this.cssCode.push(...lines);
		this.recentCss = lines.map((_, i) => start + i);
		this.recentHtml = [];
		this.lastTouched = 'css';
	}
}

export const codeData = new CodeDataStore();
