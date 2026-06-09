export function getLsItem<T>(name: string): T | null {
	const item = localStorage.getItem(name);
	return item ? (JSON.parse(item) as T) : null;
}

export function setLsItem<T>(name: string, value: T): T {
	localStorage.setItem(name, JSON.stringify(value));
	return value;
}

export function removeLsItem(name: string): void {
	localStorage.removeItem(name);
}

export function clearAll(): void {
	localStorage.clear();
}
