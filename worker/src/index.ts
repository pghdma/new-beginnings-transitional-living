// New Beginnings contact-form gateway.
//
// This worker keeps the public site decoupled from the existing mail worker. It
// validates the New Beginnings fields, adds useful non-clinical context, and
// forwards the request to the established Step By Step delivery service. The
// Turnstile token is passed through unchanged and is verified by that service.

const DELIVERY_ENDPOINT = 'https://sbs-contact.pghdma.workers.dev/api/contact';
const DELIVERY_ORIGIN = 'https://stepbystepsupport.net';
const PHONE = '412-628-0403';
const PROJECT_PAGES_HOST = 'new-beginnings-transitional-living.pages.dev';

const EXACT_ORIGINS = new Set([
	'https://newbeginningspgh.org',
	'https://www.newbeginningspgh.org',
	`https://${PROJECT_PAGES_HOST}`,
]);

type InquiryContext = 'housing' | 'referral' | 'contact';

interface InquiryPayload {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	contactType: string;
	message: string;
	context: InquiryContext;
	organization: string;
	role: string;
	preferredContact: string;
	website: string;
	loadtime: string;
	turnstileToken: string;
}

function isAllowedOrigin(origin: string): boolean {
	if (EXACT_ORIGINS.has(origin)) return true;

	try {
		const url = new URL(origin);
		return url.protocol === 'https:' && url.hostname.endsWith(`.${PROJECT_PAGES_HOST}`);
	} catch {
		return false;
	}
}

function corsHeaders(origin: string): Record<string, string> {
	return {
		'Access-Control-Allow-Origin': origin,
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Max-Age': '86400',
		'Vary': 'Origin',
		'X-Content-Type-Options': 'nosniff',
	};
}

function json(data: object, status: number, origin?: string): Response {
	const headers: Record<string, string> = {
		'Content-Type': 'application/json; charset=UTF-8',
		'Cache-Control': 'no-store',
		'X-Content-Type-Options': 'nosniff',
	};

	if (origin && isAllowedOrigin(origin)) Object.assign(headers, corsHeaders(origin));

	return new Response(JSON.stringify(data), { status, headers });
}

function stringValue(value: unknown): string {
	return typeof value === 'string' ? value.trim() : '';
}

function validEmail(value: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validPhone(value: string): boolean {
	return /^[\d\s\-+().]{7,20}$/.test(value);
}

function hasControlCharacters(value: string): boolean {
	return /[\u0000-\u001F\u007F]/.test(value);
}

function contextLabel(context: InquiryContext): string {
	if (context === 'housing') return 'Housing and admissions';
	if (context === 'referral') return 'Professional referral';
	return 'General contact';
}

function buildForwardedMessage(payload: InquiryPayload): string {
	const lines = [
		`[New Beginnings website — ${contextLabel(payload.context)}]`,
		'',
		`Contacting as/about: ${payload.contactType}`,
	];

	if (payload.organization) lines.push(`Organization: ${payload.organization}`);
	if (payload.role) lines.push(`Role: ${payload.role}`);
	if (payload.preferredContact) lines.push(`Preferred contact method: ${payload.preferredContact}`);

	lines.push('', 'Message:', payload.message || '(No additional message was provided.)');
	return lines.join('\n');
}

function parsePayload(body: Record<string, unknown>): InquiryPayload {
	const suppliedContext = stringValue(body.context);
	const context: InquiryContext = suppliedContext === 'housing' || suppliedContext === 'referral'
		? suppliedContext
		: 'contact';

	return {
		firstName: stringValue(body.firstName),
		lastName: stringValue(body.lastName),
		email: stringValue(body.email),
		phone: stringValue(body.phone),
		contactType: stringValue(body.contactType),
		message: stringValue(body.message),
		context,
		organization: stringValue(body.organization),
		role: stringValue(body.role),
		preferredContact: stringValue(body.preferredContact),
		website: stringValue(body.website),
		loadtime: stringValue(body.loadtime || body.startedAt),
		turnstileToken: stringValue(body['cf-turnstile-response']),
	};
}

function validate(payload: InquiryPayload): string[] {
	const errors: string[] = [];
	const fullName = `${payload.firstName} ${payload.lastName}`.trim();

	if (!payload.firstName) errors.push('First name is required.');
	if (!payload.lastName) errors.push('Last name is required.');
	if (payload.firstName.length > 100 || payload.lastName.length > 100) errors.push('Name is too long.');
	if (hasControlCharacters(fullName)) errors.push('Name contains invalid characters.');
	if (!payload.email) errors.push('Email is required.');
	else if (!validEmail(payload.email) || payload.email.length > 254) errors.push('Please enter a valid email address.');
	if (!payload.phone) errors.push('Phone is required.');
	else if (!validPhone(payload.phone)) errors.push('Please enter a valid phone number.');
	if (!payload.contactType) errors.push('Please select what your inquiry is about.');
	if (payload.contactType.length > 120) errors.push('Contact type is too long.');
	if (payload.message.length > 5000) errors.push('Message is too long.');
	if (payload.organization.length > 200) errors.push('Organization is too long.');
	if (payload.role.length > 150) errors.push('Role is too long.');
	if (payload.preferredContact.length > 50) errors.push('Preferred contact method is too long.');
	if (!payload.turnstileToken) errors.push('Please complete the security check and try again.');

	return errors;
}

function isLikelySpam(payload: InquiryPayload): boolean {
	return Boolean(payload.website);
}

async function readBody(request: Request): Promise<Record<string, unknown>> {
	const contentType = request.headers.get('Content-Type') || '';
	if (contentType.includes('application/json')) {
		const parsed: unknown = await request.json();
		if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Invalid body');
		return parsed as Record<string, unknown>;
	}

	if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
		const entries: Record<string, unknown> = {};
		const form = await request.formData();
		form.forEach((value, key) => {
			entries[key] = typeof value === 'string' ? value : '';
		});
		return entries;
	}

	throw new Error('Unsupported content type');
}

async function handleContact(request: Request, origin: string): Promise<Response> {
	let body: Record<string, unknown>;
	try {
		body = await readBody(request);
	} catch {
		return json({ success: false, message: 'The form submission could not be read. Please refresh and try again.' }, 400, origin);
	}

	const payload = parsePayload(body);

	// Return an ordinary success to automated honeypot/too-fast submissions. No
	// visitor content is stored or logged by this gateway.
	if (isLikelySpam(payload)) {
		return json({ success: true, message: 'Thank you. Your inquiry has been received.' }, 200, origin);
	}

	const errors = validate(payload);
	if (errors.length) {
		return json({ success: false, message: errors.join(' ') }, 422, origin);
	}

	const name = `${payload.firstName} ${payload.lastName}`.trim();
	const forwardedBody = {
		name,
		phone: payload.phone,
		email: payload.email,
		message: buildForwardedMessage(payload),
		website: payload.website,
		// Turnstile and the honeypot provide the anti-spam controls at this layer.
		// Do not pass the timing value to the legacy delivery worker, which could
		// otherwise treat a legitimate fast/autofilled form as a fake success.
		loadtime: '',
		'cf-turnstile-response': payload.turnstileToken,
	};

	let downstream: Response;
	try {
		downstream = await fetch(DELIVERY_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Origin': DELIVERY_ORIGIN,
			},
			body: JSON.stringify(forwardedBody),
		});
	} catch {
		return json({
			success: false,
			message: `We could not send your inquiry right now. Please call ${PHONE}.`,
		}, 502, origin);
	}

	if (!downstream.ok) {
		let message = `We could not send your inquiry right now. Please call ${PHONE}.`;
		if (downstream.status === 403) {
			message = 'The security check expired or could not be verified. Please complete it again.';
		}

		return json({ success: false, message }, downstream.status >= 500 ? 502 : downstream.status, origin);
	}

	return json({
		success: true,
		message: 'Thank you. Your inquiry has been received by the website administrator for New Beginnings.',
	}, 200, origin);
}

export default {
	async fetch(request: Request): Promise<Response> {
		const origin = request.headers.get('Origin') || '';

		if (!isAllowedOrigin(origin)) {
			return json({ success: false, message: 'Origin not allowed.' }, 403);
		}

		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: corsHeaders(origin) });
		}

		const url = new URL(request.url);
		if (request.method !== 'POST') {
			return json({ success: false, message: 'Method not allowed.' }, 405, origin);
		}
		if (url.pathname !== '/api/contact') {
			return json({ success: false, message: 'Not found.' }, 404, origin);
		}

		return handleContact(request, origin);
	},
};
