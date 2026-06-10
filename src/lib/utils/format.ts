/** Initials from a name, max two letters — e.g. "Alex Rivera" → "AR". */
export function initials(name: string): string {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (!parts.length) return '?';
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Compact duration for results: "1m 42s", "12s", "1h 03m". */
export function formatDuration(seconds: number): string {
	const total = Math.max(0, Math.round(seconds));
	const h = Math.floor(total / 3600);
	const m = Math.floor((total % 3600) / 60);
	const s = total % 60;

	if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`;
	if (m > 0) return `${m}m ${String(s).padStart(2, '0')}s`;
	return `${s}s`;
}

/** Coarse practice total for dashboards: "2h 14m", "14m", "<1m". */
export function formatPracticeTime(seconds: number): string {
	const total = Math.max(0, Math.round(seconds));
	if (total < 60) return '<1m';
	const h = Math.floor(total / 3600);
	const m = Math.floor((total % 3600) / 60);
	if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`;
	return `${m}m`;
}

/** Human relative date — "Last seen 2 days ago". */
export function relativeDate(iso: string): string {
	const then = new Date(iso).getTime();
	if (Number.isNaN(then)) return '';
	const diffMs = Date.now() - then;
	const day = 86_400_000;
	const days = Math.floor(diffMs / day);

	if (diffMs < 60_000) return 'just now';
	if (diffMs < 3_600_000) {
		const mins = Math.floor(diffMs / 60_000);
		return `${mins} minute${mins === 1 ? '' : 's'} ago`;
	}
	if (days < 1) {
		const hours = Math.floor(diffMs / 3_600_000);
		return `${hours} hour${hours === 1 ? '' : 's'} ago`;
	}
	if (days === 1) return 'yesterday';
	if (days < 7) return `${days} days ago`;
	if (days < 30) {
		const weeks = Math.floor(days / 7);
		return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
	}
	return new Date(iso).toLocaleDateString();
}
