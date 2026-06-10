import { json } from '@sveltejs/kit';
import { listWebLessons } from '$lib/server/lessons';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const lessons = await listWebLessons();
	return json(lessons);
};
