import { redirect } from '@sveltejs/kit';
import { ADMIN_COOKIE } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.delete(ADMIN_COOKIE, { path: '/' });
	throw redirect(303, '/admin/login');
};
