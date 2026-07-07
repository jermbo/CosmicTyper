import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import type { Difficulty, TypingLesson, WebLesson } from '$lib/types';

const DATA_ROOT = path.join(process.cwd(), 'data', 'lessons');
const WEB_DIR = path.join(DATA_ROOT, 'web');
const TYPING_DIR = path.join(DATA_ROOT, 'typing');

function sortOnDifficulty<T extends { difficulty: string }>(lessons: T[]): T[] {
	return [...lessons].sort((a, b) => a.difficulty.localeCompare(b.difficulty));
}

export function newLessonId(): string {
	return '_' + Math.random().toString(36).slice(2, 11);
}

export async function listWebLessons(): Promise<WebLesson[]> {
	const files = await readdir(WEB_DIR);
	const lessons: WebLesson[] = [];

	for (const file of files) {
		if (!file.endsWith('.json')) continue;
		const raw = await readFile(path.join(WEB_DIR, file), 'utf-8');
		lessons.push(JSON.parse(raw) as WebLesson);
	}

	return sortOnDifficulty(lessons);
}

export async function getWebLesson(id: string): Promise<WebLesson | null> {
	const filePath = path.join(WEB_DIR, `${id}.json`);
	try {
		const raw = await readFile(filePath, 'utf-8');
		return JSON.parse(raw) as WebLesson;
	} catch {
		return null;
	}
}

export async function saveWebLesson(lesson: WebLesson): Promise<void> {
	await mkdir(WEB_DIR, { recursive: true });
	const filePath = path.join(WEB_DIR, `${lesson.id}.json`);
	await writeFile(filePath, JSON.stringify(lesson, null, '\t') + '\n', 'utf-8');
}

export async function deleteWebLesson(id: string): Promise<void> {
	const { unlink } = await import('node:fs/promises');
	await unlink(path.join(WEB_DIR, `${id}.json`));
}

export async function listTypingLessons(): Promise<TypingLesson[]> {
	const dirs = await readdir(TYPING_DIR, { withFileTypes: true });
	const lessons: TypingLesson[] = [];

	for (const entry of dirs) {
		if (!entry.isDirectory()) continue;
		const lesson = await getTypingLesson(entry.name);
		if (lesson) lessons.push(lesson);
	}

	return sortOnDifficulty(lessons);
}

export async function getTypingLesson(id: string): Promise<TypingLesson | null> {
	const dir = path.join(TYPING_DIR, id);
	try {
		const metaRaw = await readFile(path.join(dir, 'meta.json'), 'utf-8');
		const meta = JSON.parse(metaRaw) as { id: string; title: string; difficulty: Difficulty };
		const linesRaw = await readFile(path.join(dir, 'lines.txt'), 'utf-8');
		const steps = linesRaw.split('\n').map((line) => line.replace(/\r$/, ''));
		// The file's final newline (and any blank lines after the last verse) would
		// become empty, un-typeable steps that never trigger lesson completion. Drop them.
		while (steps.length > 0 && steps[steps.length - 1] === '') {
			steps.pop();
		}
		return { id: meta.id, title: meta.title, difficulty: meta.difficulty, steps };
	} catch {
		return null;
	}
}

export async function saveTypingLesson(lesson: TypingLesson): Promise<void> {
	const dir = path.join(TYPING_DIR, lesson.id);
	await mkdir(dir, { recursive: true });
	const meta = { id: lesson.id, title: lesson.title, difficulty: lesson.difficulty };
	await writeFile(path.join(dir, 'meta.json'), JSON.stringify(meta, null, '\t') + '\n', 'utf-8');
	await writeFile(path.join(dir, 'lines.txt'), lesson.steps.join('\n') + '\n', 'utf-8');
}

export async function deleteTypingLesson(id: string): Promise<void> {
	const { rm } = await import('node:fs/promises');
	await rm(path.join(TYPING_DIR, id), { recursive: true, force: true });
}
