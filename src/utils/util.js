import configuraciones from './configuraciones';

export async function showReport(params) {
	const fileUrl = await configuraciones.getReport(params);
	const reportTab = window.open(
		fileUrl,
		'_blank',
		'toolbar=no,menubar=no,scrollbars=yes,resizable=yes,status=no,width=800,height=800,left=100px',
	);

	const keyInterval = setInterval(
		(url) => {
			clearInterval(keyInterval);
			if (url || reportTab?.closed) {
				URL.revokeObjectURL(url);
			}
		},
		20_000,
		fileUrl,
	);

	return fileUrl;
}

export function getFullLocation(relativeUrl) {
	const baseUrl = (process.env.BASE_URL && `/${process.env.BASE_URL}`) || '';

	return `${location.origin}${baseUrl}/${relativeUrl}`;
}
