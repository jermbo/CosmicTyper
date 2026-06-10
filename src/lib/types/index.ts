export type Difficulty = 'easy' | 'medium' | 'hard';

export type LessonType = 'web' | 'typing';

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
	steps: WebStep[];
}

export interface TypingLesson {
	id: string;
	title: string;
	difficulty: Difficulty;
	steps: string[];
}

export interface Learner {
	id: string; // crypto.randomUUID()
	name: string;
	color: string; // one of the palette hex values
	createdAt: string; // ISO 8601
	lastActiveAt: string; // ISO 8601
}

export interface Attempt {
	id: string;
	learnerId: string;
	lessonId: string;
	lessonType: LessonType;
	completedAt: string; // ISO 8601
	duration: number; // seconds
	keystrokes: number; // total correct + incorrect key presses
	mistakes: number; // wrong key presses
	accuracy: number; // 0–100
}

/** Result emitted by a typing component when a lesson is completed. */
export interface LessonResult {
	lessonId: string;
	duration: number;
	keystrokes: number;
	mistakes: number;
	accuracy: number;
}
