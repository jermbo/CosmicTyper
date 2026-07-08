/**
 * Physical US-QWERTY layout for the on-screen keyboard guide.
 * Finger assignments follow standard eight-finger touch-typing zones.
 */

export type Finger =
	| 'l-pinky'
	| 'l-ring'
	| 'l-middle'
	| 'l-index'
	| 'r-index'
	| 'r-middle'
	| 'r-ring'
	| 'r-pinky'
	| 'thumb';

export interface KeyDef {
	code: string; // KeyboardEvent.code, or Ghost* for invisible spacers
	legend: string; // what's printed on the cap
	finger: Finger;
	width?: number; // in key units, default 1
	homing?: boolean; // home-row bump (F and J)
	ghost?: boolean; // invisible spacer used to center the space bar
}

export const FINGER_NAMES: Record<Finger, string> = {
	'l-pinky': 'left pinky',
	'l-ring': 'left ring',
	'l-middle': 'left middle',
	'l-index': 'left index',
	'r-index': 'right index',
	'r-middle': 'right middle',
	'r-ring': 'right ring',
	'r-pinky': 'right pinky',
	thumb: 'thumb'
};

/* Every row sums to 15 key units so columns line up across rows. */
export const LAYOUT: KeyDef[][] = [
	[
		{ code: 'Backquote', legend: '`', finger: 'l-pinky' },
		{ code: 'Digit1', legend: '1', finger: 'l-pinky' },
		{ code: 'Digit2', legend: '2', finger: 'l-ring' },
		{ code: 'Digit3', legend: '3', finger: 'l-middle' },
		{ code: 'Digit4', legend: '4', finger: 'l-index' },
		{ code: 'Digit5', legend: '5', finger: 'l-index' },
		{ code: 'Digit6', legend: '6', finger: 'r-index' },
		{ code: 'Digit7', legend: '7', finger: 'r-index' },
		{ code: 'Digit8', legend: '8', finger: 'r-middle' },
		{ code: 'Digit9', legend: '9', finger: 'r-ring' },
		{ code: 'Digit0', legend: '0', finger: 'r-pinky' },
		{ code: 'Minus', legend: '-', finger: 'r-pinky' },
		{ code: 'Equal', legend: '=', finger: 'r-pinky' },
		{ code: 'Backspace', legend: '⌫', finger: 'r-pinky', width: 2 }
	],
	[
		{ code: 'Tab', legend: 'tab', finger: 'l-pinky', width: 1.5 },
		{ code: 'KeyQ', legend: 'q', finger: 'l-pinky' },
		{ code: 'KeyW', legend: 'w', finger: 'l-ring' },
		{ code: 'KeyE', legend: 'e', finger: 'l-middle' },
		{ code: 'KeyR', legend: 'r', finger: 'l-index' },
		{ code: 'KeyT', legend: 't', finger: 'l-index' },
		{ code: 'KeyY', legend: 'y', finger: 'r-index' },
		{ code: 'KeyU', legend: 'u', finger: 'r-index' },
		{ code: 'KeyI', legend: 'i', finger: 'r-middle' },
		{ code: 'KeyO', legend: 'o', finger: 'r-ring' },
		{ code: 'KeyP', legend: 'p', finger: 'r-pinky' },
		{ code: 'BracketLeft', legend: '[', finger: 'r-pinky' },
		{ code: 'BracketRight', legend: ']', finger: 'r-pinky' },
		{ code: 'Backslash', legend: '\\', finger: 'r-pinky', width: 1.5 }
	],
	[
		{ code: 'CapsLock', legend: 'caps', finger: 'l-pinky', width: 1.75 },
		{ code: 'KeyA', legend: 'a', finger: 'l-pinky' },
		{ code: 'KeyS', legend: 's', finger: 'l-ring' },
		{ code: 'KeyD', legend: 'd', finger: 'l-middle' },
		{ code: 'KeyF', legend: 'f', finger: 'l-index', homing: true },
		{ code: 'KeyG', legend: 'g', finger: 'l-index' },
		{ code: 'KeyH', legend: 'h', finger: 'r-index' },
		{ code: 'KeyJ', legend: 'j', finger: 'r-index', homing: true },
		{ code: 'KeyK', legend: 'k', finger: 'r-middle' },
		{ code: 'KeyL', legend: 'l', finger: 'r-ring' },
		{ code: 'Semicolon', legend: ';', finger: 'r-pinky' },
		{ code: 'Quote', legend: "'", finger: 'r-pinky' },
		{ code: 'Enter', legend: 'enter', finger: 'r-pinky', width: 2.25 }
	],
	[
		{ code: 'ShiftLeft', legend: 'shift', finger: 'l-pinky', width: 2.25 },
		{ code: 'KeyZ', legend: 'z', finger: 'l-pinky' },
		{ code: 'KeyX', legend: 'x', finger: 'l-ring' },
		{ code: 'KeyC', legend: 'c', finger: 'l-middle' },
		{ code: 'KeyV', legend: 'v', finger: 'l-index' },
		{ code: 'KeyB', legend: 'b', finger: 'l-index' },
		{ code: 'KeyN', legend: 'n', finger: 'r-index' },
		{ code: 'KeyM', legend: 'm', finger: 'r-index' },
		{ code: 'Comma', legend: ',', finger: 'r-middle' },
		{ code: 'Period', legend: '.', finger: 'r-ring' },
		{ code: 'Slash', legend: '/', finger: 'r-pinky' },
		{ code: 'ShiftRight', legend: 'shift', finger: 'r-pinky', width: 2.75 }
	],
	[
		{ code: 'Ghost1', legend: '', finger: 'thumb', width: 4, ghost: true },
		{ code: 'Space', legend: 'space', finger: 'thumb', width: 7 },
		{ code: 'Ghost2', legend: '', finger: 'thumb', width: 4, ghost: true }
	]
];

/** KeyboardEvent.code → finger, for every key on the board. */
export const FINGER_OF: Record<string, Finger> = Object.fromEntries(
	LAYOUT.flat().map((k) => [k.code, k.finger])
);
