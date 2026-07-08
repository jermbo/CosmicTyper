import { learnerStore } from './learner.svelte';
import { getLsItem, setLsItem } from '$lib/utils/storage';

const PREFS_KEY = 'ct_prefs';

interface LearnerPrefs {
	keyboardGuide?: boolean;
}

type PrefsMap = Record<string, LearnerPrefs>;

class PrefsStore {
	private prefs = $state<PrefsMap>({});

	load() {
		const raw = getLsItem<PrefsMap>(PREFS_KEY);
		this.prefs = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
	}

	/** Whether the active learner wants the on-screen keyboard guide. Defaults to on. */
	get keyboardGuide(): boolean {
		const id = learnerStore.activeLearner?.id;
		if (!id) return true;
		return this.prefs[id]?.keyboardGuide ?? true;
	}

	setKeyboardGuide(on: boolean) {
		const id = learnerStore.activeLearner?.id;
		if (!id) return;
		this.prefs = { ...this.prefs, [id]: { ...this.prefs[id], keyboardGuide: on } };
		setLsItem(PREFS_KEY, this.prefs);
	}
}

export const prefsStore = new PrefsStore();
