const API = 'https://api.sampleapis.com/typer';

export async function fetchWebLessons(): Promise<unknown[]> {
	const res = await fetch(`${API}/webLessons`);
	if (!res.ok) throw new Error('Failed to fetch web lessons');
	return res.json();
}

export async function fetchTypingLessons(): Promise<unknown[]> {
	const res = await fetch(`${API}/typingLessons`);
	if (!res.ok) throw new Error('Failed to fetch typing lessons');
	return res.json();
}
