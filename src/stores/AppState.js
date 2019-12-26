import { writable } from "svelte/store";

/**
 * Track Current Lesson
 * Track Visible State
 */

/**
 * Possible States
 *
 * WELCOME_SCREEN | LESSON_SELECT | LESSON_STARTED | LESSON_ENDED
 */
export const STATE = writable("WELCOME_SCREEN");

/**
 * This should reflect an index of lessons
 */
export const CURRENT_LESSON_INDEX = writable(0);

/**
 * A spot for all lessons
 */
export const LESSONS = writable([]);
