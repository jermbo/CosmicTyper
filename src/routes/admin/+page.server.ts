import { redirect } from '@sveltejs/kit';
import { listTypingLessons, listWebLessons, newLessonId, saveTypingLesson, saveWebLesson } from '$lib/server/lessons';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [webLessons, typingLessons] = await Promise.all([listWebLessons(), listTypingLessons()]);
	return { webLessons, typingLessons };
};

export const actions: Actions = {
	newWeb: async () => {
		const id = newLessonId();
		await saveWebLesson({
			id,
			title: 'New Web Lesson',
			difficulty: 'easy',
			steps: [
				{
					type: 'dom',
					desc: 'Describe what the learner should type here.',
					render: true,
					action: ['<p>Hello world</p>']
				}
			]
		});
		throw redirect(303, `/admin/web/${id}`);
	},
	newTyping: async () => {
		const id = newLessonId();
		await saveTypingLesson({
			id,
			title: 'New Typing Lesson',
			difficulty: 'easy',
			steps: ['Type your first line here.']
		});
		throw redirect(303, `/admin/typing/${id}`);
	}
};
