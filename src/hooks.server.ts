import { redirect } from '@sveltejs/kit';
import { ADMIN_COOKIE, verifySessionToken } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
		const session = event.cookies.get(ADMIN_COOKIE);
		if (!verifySessionToken(session)) {
			throw redirect(303, '/admin/login');
		}
	}

	return resolve(event);
};
