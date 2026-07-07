import type { TypingLesson } from '$lib/types';
import { DRILL_WORDS } from '$lib/data/drillWords';

/** Generic warm-up targets when a learner has no trouble keys yet. */
const HOME_KEYS = ['f', 'j', 'd', 'k'];

const MAX_LINE_LENGTH = 30;
const MAX_DRILL_KEYS = 4;

function isLetter(key: string): boolean {
	return key >= 'a' && key <= 'z';
}

/** Two home-row anchors that aren't the key being practiced. */
function anchorsFor(key: string): [string, string] {
	const [a, b] = HOME_KEYS.filter((k) => k !== key);
	return [a, b];
}

function shuffled<T>(items: T[]): T[] {
	const list = [...items];
	for (let i = list.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[list[i], list[j]] = [list[j], list[i]];
	}
	return list;
}

/** The key alternated with home-row anchors, e.g. "fbf jbj bbb fjb". */
function rhythmLine(key: string): string {
	if (key === ' ') return 'fj dk sl fj dk sl';
	const [a, b] = anchorsFor(key);
	return `${a}${key}${a} ${b}${key}${b} ${key}${key}${key} ${a}${b}${key}`;
}

/** Real short words containing the key. Null for keys with no word bank (symbols, space). */
function wordLine(key: string): string | null {
	if (!isLetter(key)) return null;
	const candidates = shuffled(DRILL_WORDS.filter((w) => w.includes(key)));
	if (!candidates.length) return null;

	let line = '';
	for (const word of candidates) {
		const next = line ? `${line} ${word}` : word;
		if (next.length > MAX_LINE_LENGTH) break;
		line = next;
	}
	return line || null;
}

/** Two trouble keys woven together. Null when space is involved — it gets no pair line. */
function mixedLine(k1: string, k2: string): string | null {
	if (k1 === ' ' || k2 === ' ') return null;
	return `${k1}${k2} ${k2}${k1} ${k1}${k1}${k2} ${k2}${k2}${k1}`;
}

/**
 * Build a short warm-up drill (~8 lines) targeting the given keys.
 * Falls back to a generic home-row warm-up when there are none, so the
 * warm-up never feels like something that only appears when you struggle.
 */
export function generateDrill(keys: string[], learnerId: string): TypingLesson {
	const targets = (keys.length ? keys : HOME_KEYS).slice(0, MAX_DRILL_KEYS);

	const steps: string[] = [];
	for (const key of targets) {
		steps.push(rhythmLine(key));
		const words = wordLine(key);
		if (words) steps.push(words);
	}
	for (let i = 0; i + 1 < targets.length && steps.length < 9; i += 2) {
		const mixed = mixedLine(targets[i], targets[i + 1]);
		if (mixed) steps.push(mixed);
	}

	const date = new Date().toISOString().slice(0, 10);
	return {
		id: `drill:${learnerId}:${date}`,
		title: 'Warm-up',
		difficulty: 'easy',
		steps: steps.slice(0, 9)
	};
}
