import { error, fail, redirect } from '@sveltejs/kit';
import type { Difficulty } from '$lib/types';
import { deleteTypingLesson, getTypingLesson, saveTypingLesson } from '$lib/server/lessons';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const lesson = await getTypingLesson(params.id);
	if (!lesson) error(404, 'Lesson not found');
	return { lesson };
};

export const actions: Actions = {
	save: async ({ request, params }) => {
		const data = await request.formData();
		const title = data.get('title')?.toString().trim();
		const difficulty = data.get('difficulty')?.toString() as Difficulty;
		const lines = data.get('lines')?.toString() ?? '';

		if (!title) return fail(400, { error: 'Title is required' });
		if (!['easy', 'medium', 'hard'].includes(difficulty)) {
			return fail(400, { error: 'Invalid difficulty' });
		}

		const steps = lines.split('\n').map((line) => line.replace(/\r$/, ''));

		await saveTypingLesson({ id: params.id, title, difficulty, steps });
		return { saved: true };
	},
	delete: async ({ params }) => {
		await deleteTypingLesson(params.id);
		throw redirect(303, '/admin');
	}
};
