import type { Learner } from '$lib/types';
import { PALETTE } from '$lib/constants';
import { getLsItem, setLsItem, removeLsItem } from '$lib/utils/storage';

const LEARNERS_KEY = 'ct_learners';
const ACTIVE_KEY = 'ct_active_learner';

const VALID_COLORS = new Set<string>(PALETTE.map((c) => c.hex));

function isValidLearner(item: unknown): item is Learner {
	if (!item || typeof item !== 'object') return false;
	const l = item as Record<string, unknown>;
	return (
		typeof l.id === 'string' &&
		typeof l.name === 'string' &&
		typeof l.color === 'string' &&
		typeof l.createdAt === 'string' &&
		typeof l.lastActiveAt === 'string'
	);
}

function sanitizeLearner(l: Learner): Learner {
	return {
		...l,
		// Fall back to first palette color if stored value is not in the palette.
		color: VALID_COLORS.has(l.color) ? l.color : PALETTE[0].hex
	};
}

class LearnerStore {
	learners = $state<Learner[]>([]);
	activeLearner = $state<Learner | null>(null);

	/** Hydrate from localStorage. Safe to call multiple times. */
	load() {
		const raw = getLsItem<Learner[]>(LEARNERS_KEY);
		const valid = Array.isArray(raw) ? raw.filter(isValidLearner).map(sanitizeLearner) : [];
		this.learners = valid;

		const activeId = getLsItem<string>(ACTIVE_KEY);
		this.activeLearner =
			typeof activeId === 'string' ? (this.learners.find((l) => l.id === activeId) ?? null) : null;
	}

	create(name: string, color: string): Learner {
		const now = new Date().toISOString();
		const safeColor = VALID_COLORS.has(color) ? color : PALETTE[0].hex;
		const learner: Learner = {
			id: crypto.randomUUID(),
			name: name.trim(),
			color: safeColor,
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
