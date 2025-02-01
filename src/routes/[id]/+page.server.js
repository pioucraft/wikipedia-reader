export const load = async ({ params }) => {
	const data = params;
	var response;
	response = await (
		await fetch(`https://en.wikipedia.org/w/index.php?title=${data.id}&action=raw`)
	).text();

	while (response.includes('{{')) {
		response = response.replace(/\{\{[^{}]*\}\}/g, '');
	}

	// Remove lines that start with "File:"
	response = response
		.split('\n')
		.filter((line) => !line.trim().startsWith('[[File:'))
		.join('\n');

	response = response.replace(/<[^>]*>.*?<\/[^>]*>/gs, '');

	response = response.replace(/\[\[([^\]\|]+)(?:\|([^\]\n]+))?\]\]/g, (match, link, desc) => {
		return `<a href="/${link}">${desc || link}</a>`;
	});

	return { response: response };
};
