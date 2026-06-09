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

class LessonsStore {
	webLessons = $state<WebLesson[]>([]);
	typingLessons = $state<TypingLesson[]>([]);

	async loadWebLessons() {
		removeLsItem(LEGACY_WEB_KEY);
		const cached = getLsItem<WebLesson[]>(WEB_KEY);
		if (cached) {
			this.webLessons = cached;
			return;
		}
		const data = await fetchWebLessons();
		const processed = sortOnDifficulty(data as WebLesson[]);
		setLsItem(WEB_KEY, processed);
		this.webLessons = processed;
	}

	async loadTypingLessons() {
		removeLsItem(LEGACY_TYPING_KEY);
		const cached = getLsItem<TypingLesson[]>(TYPING_KEY);
		if (cached) {
			this.typingLessons = cached;
			return;
		}
		const data = await fetchTypingLessons();
		const processed = sortOnDifficulty(data as TypingLesson[]);
		setLsItem(TYPING_KEY, processed);
		this.typingLessons = processed;
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
