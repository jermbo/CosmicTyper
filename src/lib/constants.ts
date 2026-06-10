/** Fixed, friendly avatar palette — no hex input for beginners. */
export const PALETTE = [
	{ name: 'Cherry', hex: '#e64c65' },
	{ name: 'Ocean', hex: '#35aadc' },
	{ name: 'Lime', hex: '#bada55' },
	{ name: 'Tangerine', hex: '#fcb150' },
	{ name: 'Lavender', hex: '#a855f7' },
	{ name: 'Mint', hex: '#10b981' },
	{ name: 'Slate', hex: '#64748b' },
	{ name: 'Coral', hex: '#f97316' }
] as const;

export const MAX_NAME_LENGTH = 30;

/** Show the learner search/filter input once there are more than this many. */
export const SEARCH_THRESHOLD = 6;
