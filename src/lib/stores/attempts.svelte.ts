import type { Attempt } from '$lib/types';
import { getLsItem, setLsItem } from '$lib/utils/storage';

const ATTEMPTS_KEY = 'ct_attempts';

function isValidKeyMistakes(value: unknown): boolean {
	if (value === undefined) return true; // absent on attempts from before per-key tracking
	if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
	return Object.values(value).every((n) => typeof n === 'number' && n >= 0);
}

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
		a.accuracy <= 100 &&
		isValidKeyMistakes(a.keyMistakes)
	);
}

/** Warm-up drill attempts use this lesson-id prefix, so they can never collide with real lessons. */
export const DRILL_ID_PREFIX = 'drill:';

// Aggregation rules for troubleKeys().
const TROUBLE_WINDOW = 10; // most recent attempts considered
const TROUBLE_THRESHOLD = 3; // misses inside the window before a key qualifies

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

	/** Unique lesson ids the learner has completed at least once. Warm-up drills don't count. */
	completedLessonIds(learnerId: string): Set<string> {
		return new Set(
			this.forLearner(learnerId)
				.filter((a) => !a.lessonId.startsWith(DRILL_ID_PREFIX))
				.map((a) => a.lessonId)
		);
	}

	/**
	 * The learner's current practice keys, worst first. Case-folds letters
	 * (misses on E count toward e) and only looks at recent attempts so old
	 * struggles don't haunt anyone. Empty when there's not enough signal.
	 */
	troubleKeys(learnerId: string, max = 5): string[] {
		const recent = this.forLearner(learnerId)
			.filter((a) => a.keyMistakes && Object.keys(a.keyMistakes).length)
			.sort((a, b) => b.completedAt.localeCompare(a.completedAt))
			.slice(0, TROUBLE_WINDOW);

		const counts = new Map<string, number>();
		for (const attempt of recent) {
			for (const [char, misses] of Object.entries(attempt.keyMistakes!)) {
				const key = char >= 'A' && char <= 'Z' ? char.toLowerCase() : char;
				counts.set(key, (counts.get(key) ?? 0) + misses);
			}
		}

		return [...counts.entries()]
			.filter(([, misses]) => misses >= TROUBLE_THRESHOLD)
			.sort((a, b) => b[1] - a[1])
			.slice(0, max)
			.map(([key]) => key);
	}

	/** Most recent warm-up drill attempt for a learner, or null. */
	latestDrillFor(learnerId: string): Attempt | null {
		const list = this.forLearner(learnerId).filter((a) =>
			a.lessonId.startsWith(DRILL_ID_PREFIX)
		);
		if (!list.length) return null;
		return list.reduce((latest, a) => (a.completedAt > latest.completedAt ? a : latest));
	}
}

export const attemptsStore = new AttemptsStore();
