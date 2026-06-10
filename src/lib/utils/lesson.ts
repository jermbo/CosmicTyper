import type { WebLesson } from '$lib/types';

/**
 * Converts a lesson title to a URL-safe slug.
 * Strips punctuation, collapses whitespace, and joins with underscores.
 */
export function slugify(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^\w\s]/g, '') // strip punctuation
		.trim()
		.replace(/\s+/g, '_'); // collapse spaces → underscores
}

/**
 * The finished output a web lesson builds toward — the same accumulation the
 * Typer performs as steps render, but run over every render step up front.
 * Used to show the "Goal" preview the learner types toward.
 */
export function buildLessonOutput(lesson: WebLesson | null): { html: string[]; css: string[] } {
	const html: string[] = [];
	const css: string[] = [];
	if (!lesson) return { html, css };

	for (const step of lesson.steps) {
		if (!step.render) continue;
		if (step.type === 'dom') html.push(...step.action);
		else if (step.type === 'style') css.push(...step.action);
	}
	return { html, css };
}
