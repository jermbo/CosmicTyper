import type { WebStep } from '$lib/types';

/** Plain-object clone safe for Svelte $state proxies (structuredClone cannot clone them). */
export function cloneWebSteps(steps: WebStep[]): WebStep[] {
	return steps.map((step) => ({
		type: step.type,
		desc: step.desc,
		render: step.render,
		action: step.action.map((line) => line)
	}));
}

export function cloneLines(lines: string[]): string[] {
	return lines.map((line) => line);
}
