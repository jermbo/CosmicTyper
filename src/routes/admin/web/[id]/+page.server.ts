import { error, fail, redirect } from '@sveltejs/kit';
import type { Difficulty, WebLesson, WebStep } from '$lib/types';
import { deleteWebLesson, getWebLesson, saveWebLesson } from '$lib/server/lessons';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const lesson = await getWebLesson(params.id);
	if (!lesson) error(404, 'Lesson not found');
	return { lesson };
};

function parseSteps(data: FormData): WebStep[] | { error: string } {
	const raw = data.get('steps')?.toString();
	if (!raw) return { error: 'Steps are required' };
	try {
		const steps = JSON.parse(raw) as unknown;
		if (!Array.isArray(steps) || steps.length === 0) {
			return { error: 'At least one step is required' };
		}
		for (const step of steps) {
			if (!step || typeof step !== 'object') return { error: 'Invalid step data' };
			const s = step as Record<string, unknown>;
			if (s.type !== 'dom' && s.type !== 'style') return { error: 'Invalid step type' };
			if (typeof s.desc !== 'string' || !s.desc.trim()) return { error: 'Each step needs an instruction' };
			if (typeof s.render !== 'boolean') return { error: 'Invalid render flag' };
			if (!Array.isArray(s.action)) return { error: 'Each step needs code lines' };
		}
		return steps as WebStep[];
	} catch {
		return { error: 'Invalid step data' };
	}
}

export const actions: Actions = {
	save: async ({ request, params }) => {
		const data = await request.formData();
		const title = data.get('title')?.toString().trim();
		const difficulty = data.get('difficulty')?.toString() as Difficulty;
		const stepsResult = parseSteps(data);

		if (!title) return fail(400, { error: 'Title is required' });
		if (!['easy', 'medium', 'hard'].includes(difficulty)) {
			return fail(400, { error: 'Invalid difficulty' });
		}
		if ('error' in stepsResult) return fail(400, { error: stepsResult.error });

		const lesson: WebLesson = {
			id: params.id,
			title,
			difficulty,
			steps: stepsResult
		};
		await saveWebLesson(lesson);
		return { saved: true };
	},
	delete: async ({ params }) => {
		await deleteWebLesson(params.id);
		throw redirect(303, '/admin');
	}
};
