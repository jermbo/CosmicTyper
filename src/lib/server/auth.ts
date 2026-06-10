import { createHmac, timingSafeEqual } from 'node:crypto';
import { env } from '$env/dynamic/private';

export const ADMIN_COOKIE = 'ct_admin_session';
const SESSION_MS = 24 * 60 * 60 * 1000;

function secret(): string {
	return env.ADMIN_PASSWORD ?? 'cosmictyper-dev';
}

export function verifyPassword(password: string): boolean {
	const expected = env.ADMIN_PASSWORD;
	if (!expected) return password === 'cosmictyper-dev';
	if (password.length !== expected.length) return false;
	return timingSafeEqual(Buffer.from(password), Buffer.from(expected));
}

export function createSessionToken(): string {
	const payload = Date.now().toString();
	const sig = createHmac('sha256', secret()).update(payload).digest('hex');
	return `${payload}.${sig}`;
}

export function verifySessionToken(token: string | undefined): boolean {
	if (!token) return false;
	const dot = token.indexOf('.');
	if (dot === -1) return false;
	const payload = token.slice(0, dot);
	const sig = token.slice(dot + 1);
	const issued = Number(payload);
	if (!Number.isFinite(issued) || Date.now() - issued > SESSION_MS) return false;
	const expected = createHmac('sha256', secret()).update(payload).digest('hex');
	if (sig.length !== expected.length) return false;
	return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}
