import type { WebLesson, TypingLesson } from '$lib/types';
import { removeLsItem } from '$lib/utils/storage';

// Legacy keys from older versions — cleared on load.
const LEGACY_WEB_KEY = 'web-lessons';
const LEGACY_TYPING_KEY = 'typing-lessons';
const CACHED_WEB_KEY = 'ct_lessons_web';
const CACHED_TYPING_KEY = 'ct_lessons_typing';

function sortOnDifficulty<T extends { difficulty: string }>(lessons: T[]): T[] {
	return [...lessons].sort((a, b) => a.difficulty.localeCompare(b.difficulty));
}

function isWebLesson(item: unknown): item is WebLesson {
	if (!item || typeof item !== 'object') return false;
	const l = item as Record<string, unknown>;
	return (
		typeof l.id === 'string' &&
		typeof l.title === 'string' &&
		typeof l.difficulty === 'string' &&
		Array.isArray(l.steps)
	);
}

function isTypingLesson(item: unknown): item is TypingLesson {
	if (!item || typeof item !== 'object') return false;
	const l = item as Record<string, unknown>;
	return (
		typeof l.id === 'string' &&
		typeof l.title === 'string' &&
		typeof l.difficulty === 'string' &&
		Array.isArray(l.steps) &&
		(l.steps as unknown[]).every((s) => typeof s === 'string')
	);
}

class LessonsStore {
	webLessons = $state<WebLesson[]>([]);
	typingLessons = $state<TypingLesson[]>([]);
	loadError = $state<string | null>(null);

	async loadWebLessons() {
		removeLsItem(LEGACY_WEB_KEY);
		removeLsItem(CACHED_WEB_KEY);
		try {
			const res = await fetch('/api/lessons/web');
			if (!res.ok) throw new Error('Failed to load web lessons');
			const data = await res.json();
			if (!Array.isArray(data)) throw new Error('Unexpected response');
			this.webLessons = sortOnDifficulty(data.filter(isWebLesson));
			this.loadError = null;
		} catch (err) {
			this.loadError = err instanceof Error ? err.message : 'Failed to load web lessons';
		}
	}

	async loadTypingLessons() {
		removeLsItem(LEGACY_TYPING_KEY);
		removeLsItem(CACHED_TYPING_KEY);
		try {
			const res = await fetch('/api/lessons/typing');
			if (!res.ok) throw new Error('Failed to load typing lessons');
			const data = await res.json();
			if (!Array.isArray(data)) throw new Error('Unexpected response');
			this.typingLessons = sortOnDifficulty(data.filter(isTypingLesson));
			this.loadError = null;
		} catch (err) {
			this.loadError = err instanceof Error ? err.message : 'Failed to load typing lessons';
		}
	}

	/** Lookup a lesson title across both lists (used for activity/results). */
	titleFor(lessonId: string): string {
		return (
			this.webLessons.find((l) => l.id === lessonId)?.title ??
			this.typingLessons.find((l) => l.id === lessonId)?.title ??
			'Lesson'
		);
	}
}

export const lessonsStore = new LessonsStore();
