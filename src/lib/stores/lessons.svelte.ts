import type { WebLesson, TypingLesson } from '$lib/types';
import { removeLsItem } from '$lib/utils/storage';
import webLessonsData from '$lib/data/web-lessons.json';
import typingLessonsData from '$lib/data/typing-lessons.json';

// Legacy keys (pre learner-profiles) that embedded completion state on the
// lesson object. Completion is now derived per-learner from attemptsStore.
const LEGACY_WEB_KEY = 'web-lessons';
const LEGACY_TYPING_KEY = 'typing-lessons';
const CACHED_WEB_KEY = 'ct_lessons_web';
const CACHED_TYPING_KEY = 'ct_lessons_typing';

function sortOnDifficulty<T extends { difficulty: string }>(lessons: T[]): T[] {
	return [...lessons].sort((a, b) => a.difficulty.localeCompare(b.difficulty));
}

class LessonsStore {
	webLessons = $state<WebLesson[]>([]);
	typingLessons = $state<TypingLesson[]>([]);

	loadWebLessons() {
		removeLsItem(LEGACY_WEB_KEY);
		removeLsItem(CACHED_WEB_KEY);
		this.webLessons = sortOnDifficulty(webLessonsData as WebLesson[]);
	}

	loadTypingLessons() {
		removeLsItem(LEGACY_TYPING_KEY);
		removeLsItem(CACHED_TYPING_KEY);
		this.typingLessons = sortOnDifficulty(typingLessonsData as TypingLesson[]);
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
