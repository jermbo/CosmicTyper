import { fail, redirect } from '@sveltejs/kit';
import { ADMIN_COOKIE, createSessionToken, verifyPassword, verifySessionToken } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	if (verifySessionToken(cookies.get(ADMIN_COOKIE))) {
		throw redirect(303, '/admin');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password')?.toString() ?? '';

		if (!verifyPassword(password)) {
			return fail(400, { error: 'Incorrect password' });
		}

		cookies.set(ADMIN_COOKIE, createSessionToken(), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24
		});

		throw redirect(303, '/admin');
	}
};
