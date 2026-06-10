import type { Attempt } from '$lib/types';
import { getLsItem, setLsItem } from '$lib/utils/storage';

const ATTEMPTS_KEY = 'ct_attempts';

function isValidAttempt(item: unknown): item is Attempt {
	if (!item || typeof item !== 'object') return false;
	const a = item as Record<string, unknown>;
	return (
		typeof a.id === 'string' &&
		typeof a.learnerId === 'string' &&
		typeof a.lessonId === 'string' &&
		typeof a.completedAt === 'string' &&
		typeof a.duration === 'number' &&
		typeof a.keystrokes === 'number' &&
		typeof a.mistakes === 'number' &&
		typeof a.accuracy === 'number' &&
		a.accuracy >= 0 &&
		a.accuracy <= 100
	);
}

class AttemptsStore {
	attempts = $state<Attempt[]>([]);

	load() {
		const raw = getLsItem<Attempt[]>(ATTEMPTS_KEY);
		this.attempts = Array.isArray(raw) ? raw.filter(isValidAttempt) : [];
	}

	add(data: Omit<Attempt, 'id' | 'completedAt'>): Attempt {
		const attempt: Attempt = {
			...data,
			id: crypto.randomUUID(),
			completedAt: new Date().toISOString()
		};
		this.attempts = [...this.attempts, attempt];
		setLsItem(ATTEMPTS_KEY, this.attempts);
		return attempt;
	}

	forLearner(learnerId: string): Attempt[] {
		return this.attempts.filter((a) => a.learnerId === learnerId);
	}

	forLesson(learnerId: string, lessonId: string): Attempt[] {
		return this.forLearner(learnerId).filter((a) => a.lessonId === lessonId);
	}

	/** Most recent attempt for a lesson, or null. */
	latestFor(learnerId: string, lessonId: string): Attempt | null {
		const list = this.forLesson(learnerId, lessonId);
		if (!list.length) return null;
		return list.reduce((latest, a) => (a.completedAt > latest.completedAt ? a : latest));
	}

	/** Unique lesson ids the learner has completed at least once. */
	completedLessonIds(learnerId: string): Set<string> {
		return new Set(this.forLearner(learnerId).map((a) => a.lessonId));
	}
}

export const attemptsStore = new AttemptsStore();
