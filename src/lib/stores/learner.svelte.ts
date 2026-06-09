import type { Learner } from '$lib/types';
import { getLsItem, setLsItem, removeLsItem } from '$lib/utils/storage';

const LEARNERS_KEY = 'ct_learners';
const ACTIVE_KEY = 'ct_active_learner';

class LearnerStore {
	learners = $state<Learner[]>([]);
	activeLearner = $state<Learner | null>(null);

	/** Hydrate from localStorage. Safe to call multiple times. */
	load() {
		this.learners = getLsItem<Learner[]>(LEARNERS_KEY) ?? [];
		const activeId = getLsItem<string>(ACTIVE_KEY);
		this.activeLearner = activeId ? (this.learners.find((l) => l.id === activeId) ?? null) : null;
	}

	create(name: string, color: string): Learner {
		const now = new Date().toISOString();
		const learner: Learner = {
			id: crypto.randomUUID(),
			name: name.trim(),
			color,
			createdAt: now,
			lastActiveAt: now
		};
		this.learners = [...this.learners, learner];
		this.persistLearners();
		return learner;
	}

	setActive(id: string) {
		const learner = this.learners.find((l) => l.id === id);
		if (!learner) return;
		learner.lastActiveAt = new Date().toISOString();
		this.activeLearner = learner;
		this.persistLearners();
		setLsItem(ACTIVE_KEY, id);
	}

	deactivate() {
		this.activeLearner = null;
		removeLsItem(ACTIVE_KEY);
	}

	private persistLearners() {
		setLsItem(LEARNERS_KEY, this.learners);
	}
}

export const learnerStore = new LearnerStore();
