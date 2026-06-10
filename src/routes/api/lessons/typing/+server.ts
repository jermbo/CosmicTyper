import { json } from '@sveltejs/kit';
import { listTypingLessons } from '$lib/server/lessons';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const lessons = await listTypingLessons();
	return json(lessons);
};
