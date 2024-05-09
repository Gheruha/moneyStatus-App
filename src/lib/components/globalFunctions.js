// this file holds the global functions (the functions that are called in more than one file)

export function formatDay(dateString) {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

export function goToActualMonth(date) {
	addDate(formatDay(date));
}

export async function deleteData(money_id) {
	const data = JSON.stringify(money_id);
	await fetch('api/deleteData', {
		method: 'POST',
		body: data,
		headers: {
			'content-type': 'application/json'
		}
	});
	location.reload();
}
