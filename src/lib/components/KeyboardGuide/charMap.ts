/** Which key (and whether Shift) produces a character on US QWERTY. */

export interface KeyTarget {
	code: string; // KeyboardEvent.code of the key to highlight
	shift: boolean; // whether a Shift key highlights too
}

const BASE: Record<string, string> = {
	'`': 'Backquote',
	'1': 'Digit1',
	'2': 'Digit2',
	'3': 'Digit3',
	'4': 'Digit4',
	'5': 'Digit5',
	'6': 'Digit6',
	'7': 'Digit7',
	'8': 'Digit8',
	'9': 'Digit9',
	'0': 'Digit0',
	'-': 'Minus',
	'=': 'Equal',
	'[': 'BracketLeft',
	']': 'BracketRight',
	'\\': 'Backslash',
	';': 'Semicolon',
	"'": 'Quote',
	',': 'Comma',
	'.': 'Period',
	'/': 'Slash',
	' ': 'Space'
};

const SHIFTED: Record<string, string> = {
	'~': 'Backquote',
	'!': 'Digit1',
	'@': 'Digit2',
	'#': 'Digit3',
	$: 'Digit4',
	'%': 'Digit5',
	'^': 'Digit6',
	'&': 'Digit7',
	'*': 'Digit8',
	'(': 'Digit9',
	')': 'Digit0',
	_: 'Minus',
	'+': 'Equal',
	'{': 'BracketLeft',
	'}': 'BracketRight',
	'|': 'Backslash',
	':': 'Semicolon',
	'"': 'Quote',
	'<': 'Comma',
	'>': 'Period',
	'?': 'Slash'
};

/** Null for anything the guide can't teach — the lesson is never blocked by the guide. */
export function keyForChar(char: string): KeyTarget | null {
	if (char.length !== 1) return null;
	if (char >= 'a' && char <= 'z') return { code: `Key${char.toUpperCase()}`, shift: false };
	if (char >= 'A' && char <= 'Z') return { code: `Key${char}`, shift: true };
	if (char in BASE) return { code: BASE[char], shift: false };
	if (char in SHIFTED) return { code: SHIFTED[char], shift: true };
	return null;
}
