export function getLsItem<T>(name: string): T | null {
	const item = localStorage.getItem(name);
	if (!item) return null;
	try {
		return JSON.parse(item) as T;
	} catch {
		// Corrupt or tampered storage value — discard it so the app can recover.
		localStorage.removeItem(name);
		return null;
	}
}

export function setLsItem<T>(name: string, value: T): T {
	localStorage.setItem(name, JSON.stringify(value));
	return value;
}

export function removeLsItem(name: string): void {
	localStorage.removeItem(name);
}

/** Remove all keys belonging to this app (ct_ prefix). */
export function clearAppStorage(): void {
	const keys = Object.keys(localStorage).filter((k) => k.startsWith('ct_'));
	for (const key of keys) {
		localStorage.removeItem(key);
	}
}
