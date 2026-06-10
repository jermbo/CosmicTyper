import type { WebLesson, TypingLesson } from '$lib/types';
import { getLsItem, setLsItem, removeLsItem } from '$lib/utils/storage';
import { fetchWebLessons, fetchTypingLessons } from '$lib/utils/api';

const WEB_KEY = 'ct_lessons_web';
const TYPING_KEY = 'ct_lessons_typing';

// Legacy keys (pre learner-profiles) that embedded completion state on the
// lesson object. Completion is now derived per-learner from attemptsStore.
const LEGACY_WEB_KEY = 'web-lessons';
const LEGACY_TYPING_KEY = 'typing-lessons';

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
		const cached = getLsItem<WebLesson[]>(WEB_KEY);
		if (cached && Array.isArray(cached) && cached.every(isWebLesson)) {
			this.webLessons = cached;
			return;
		}
		try {
			const data = await fetchWebLessons();
			if (!Array.isArray(data)) throw new Error('Unexpected API response shape');
			const valid = data.filter(isWebLesson);
			const processed = sortOnDifficulty(valid);
			setLsItem(WEB_KEY, processed);
			this.webLessons = processed;
			this.loadError = null;
		} catch (err) {
			this.loadError = err instanceof Error ? err.message : 'Failed to load web lessons';
		}
	}

	async loadTypingLessons() {
		removeLsItem(LEGACY_TYPING_KEY);
		const cached = getLsItem<TypingLesson[]>(TYPING_KEY);
		if (cached && Array.isArray(cached) && cached.every(isTypingLesson)) {
			this.typingLessons = cached;
			return;
		}
		try {
			const data = await fetchTypingLessons();
			if (!Array.isArray(data)) throw new Error('Unexpected API response shape');
			const valid = data.filter(isTypingLesson);
			const processed = sortOnDifficulty(valid);
			setLsItem(TYPING_KEY, processed);
			this.typingLessons = processed;
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
