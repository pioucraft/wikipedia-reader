import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const response = await fetch(
		`https://en.wikipedia.org/w/api.php?action=parse&page=${params.name}&format=json&prop=wikitext`
	);
	const data = await response.json();
	const wikitext = data.parse.wikitext['*'];

	const parser = new WikiParser();
	return {
		html: parser.parse(wikitext),
		title: data.parse.title,
		name: params.name
	};
};

class WikiParser {
	constructor() {}

	parse(text: string) {
		text = this.removeCommentaries(text);
		text = this.removeImages(text);
		text = this.parseHeadings(text);
		text = this.parseLinks(text);
		text = this.removeBracesContent(text);
		text = this.wrapInParagraphs(text);
		text = this.removeRefs(text);
		text = this.parseBold(text);
		text = this.parseItalic(text);

		return text;
	}

	removeCommentaries(text: string) {
		return text.replace(/<!--.*?-->/g, '');
	}

	removeImages(text: string) {
		return text
			.split('\n')
			.filter((line) => !line.startsWith('[[File:'))
			.join('\n');
	}

	parseHeadings(text: string) {
		return text.replace(/^(={2,6})\s*(.+?)\s*\1$/gm, (match, equals, content) => {
			const level = equals.length;
			return `<h${level}>${content}</h${level}>`;
		});
	}

	parseLinks(text: string) {
		return text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (match, target, label) => {
			label = label || target;
			return `<a href="/wiki/${encodeURIComponent(target)}">${label}</a>`;
		});
	}

	removeBracesContent(text: string) {
		while (/\{[^{}]*\}/.test(text)) {
			text = text.replace(/\{[^{}]*\}/g, '');
		}
		return text;
	}

	wrapInParagraphs(text: string) {
		return text
			.split(/\n+/)
			.map((line) => (line.trim() ? `<p>${line}</p>` : ''))
			.join('\n');
	}

	removeRefs(text: string) {
		return text.replace(/<ref[^>]*>.*?<\/ref>/g, '');
	}

	parseBold(text: string) {
		return text.replace(/'''((?:(?!''').)*?)'''/g, '<strong>$1</strong>');
	}

	parseItalic(text: string) {
		return text.replace(/''((?:(?!''').)*?)''/g, '<em>$1</em>');
	}
}
