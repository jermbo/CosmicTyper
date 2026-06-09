export type Difficulty = 'easy' | 'medium' | 'hard';

export interface WebStep {
	type: 'dom' | 'style';
	desc: string;
	render: boolean;
	action: string[];
}

export interface WebLesson {
	id: string;
	title: string;
	difficulty: Difficulty;
	hasCompleted: boolean;
	hasStarted: boolean;
	steps: WebStep[];
}

export interface TypingLesson {
	id: string;
	title: string;
	difficulty: Difficulty;
	hasCompleted: boolean;
	hasStarted: boolean;
	steps: string[];
}
