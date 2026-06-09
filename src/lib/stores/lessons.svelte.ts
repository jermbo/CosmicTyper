import type { WebLesson, TypingLesson } from '$lib/types';
import { getLsItem, setLsItem } from '$lib/utils/storage';
import { fetchWebLessons, fetchTypingLessons } from '$lib/utils/api';

const WEB_KEY = 'web-lessons';
const TYPING_KEY = 'typing-lessons';

function sortOnDifficulty<T extends { difficulty: string }>(lessons: T[]): T[] {
	return [...lessons].sort((a, b) => a.difficulty.localeCompare(b.difficulty));
}

function addStatus<T>(lessons: T[]): (T & { hasCompleted: boolean; hasStarted: boolean })[] {
	return lessons.map((l) => ({ ...l, hasCompleted: false, hasStarted: false }));
}

class LessonsStore {
	webLessons = $state<WebLesson[]>([]);
	typingLessons = $state<TypingLesson[]>([]);

	async loadWebLessons() {
		const cached = getLsItem<WebLesson[]>(WEB_KEY);
		if (cached) {
			this.webLessons = cached;
			return;
		}
		const data = await fetchWebLessons();
		const processed = addStatus(sortOnDifficulty(data as WebLesson[]));
		setLsItem(WEB_KEY, processed);
		this.webLessons = processed;
	}

	async loadTypingLessons() {
		const cached = getLsItem<TypingLesson[]>(TYPING_KEY);
		if (cached) {
			this.typingLessons = cached;
			return;
		}
		const data = await fetchTypingLessons();
		const processed = addStatus(sortOnDifficulty(data as TypingLesson[]));
		setLsItem(TYPING_KEY, processed);
		this.typingLessons = processed;
	}

	toggleWebLesson(id: string) {
		const index = this.webLessons.findIndex((l) => l.id == id);
		if (index === -1) return;
		this.webLessons[index].hasCompleted = !this.webLessons[index].hasCompleted;
		setLsItem(WEB_KEY, this.webLessons);
	}

	toggleTypingLesson(id: string) {
		const index = this.typingLessons.findIndex((l) => l.id == id);
		if (index === -1) return;
		this.typingLessons[index].hasCompleted = !this.typingLessons[index].hasCompleted;
		setLsItem(TYPING_KEY, this.typingLessons);
	}
}

export const lessonsStore = new LessonsStore();
