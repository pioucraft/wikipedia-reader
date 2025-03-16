// @ts-nocheck
import type { PageServerLoad } from './$types';
import { JSDOM } from 'jsdom';

export const load: PageServerLoad = async ({ params, request }) => {
	const userAgent = request.headers.get('user-agent') || '';
	const isMobile = /mobile/i.test(userAgent);
	const baseUrl = isMobile ? 'https://en.m.wikipedia.org/wiki/' : 'https://en.wikipedia.org/wiki/';
	const response = await fetch(`${baseUrl}${params.name}`);
	const data = await response.text();

	const dom = new JSDOM(data);
	const document = dom.window.document;
	// Remove unnecessary elements
	const elementsToRemove = [
		'.vector-header-container',
		'.mw-footer-container',
		'.mw-footer-container',
		'.vector-column-end',
		'.vector-column-start',
		'.vector-toc-landmark',
		'.firstHeading',
		'#p-lang-btn',
		'.vector-page-toolbar',
		'.vector-body-before-content',
		'.header-container',
		'.pre-content',
		'.mw-jump-link'
	];
	elementsToRemove.forEach((selector) => {
		const elements = document.querySelectorAll(selector);
		elements.forEach((element: any) => element.remove());
	});

	return {
		html: document.documentElement.outerHTML,
		name: params.name
	};
};
