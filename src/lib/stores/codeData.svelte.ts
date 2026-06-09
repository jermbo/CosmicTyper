class CodeDataStore {
	htmlCode = $state<string[]>([]);
	cssCode = $state<string[]>([]);

	// Line indices added by the most recent push, so the minimap can flash
	// exactly what just rendered. Replaced (not appended) on each push so only
	// the newest lines highlight.
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
		this.htmlCode = [...this.htmlCode, ...lines];
		this.recentHtml = lines.map((_, i) => start + i);
		this.recentCss = [];
		this.lastTouched = 'html';
	}

	pushCss(lines: string[]) {
		const start = this.cssCode.length;
		this.cssCode = [...this.cssCode, ...lines];
		this.recentCss = lines.map((_, i) => start + i);
		this.recentHtml = [];
		this.lastTouched = 'css';
	}
}

export const codeData = new CodeDataStore();
