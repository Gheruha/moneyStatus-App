// this file holds the global functions (the functions that are called in more than one file)

export function formatDay(dateString) {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

async function addDate(date) {
	const data = JSON.stringify(date);
	await fetch('api/setMonth', {
		method: 'POST',
		body: data,
		headers: {
			'content-type': 'application/json'
		}
	});
	location.reload();
}

export function goToActualMonth(date) {
	addDate(formatDay(date));
}

export function increaseMonth(date) {
	const dateObj = new Date(date);

	dateObj.setMonth(dateObj.getMonth() + 1);
	date = formatDay(dateObj);
	addDate(date);
}

export function decreaseMonth(date) {
	const dateObj = new Date(date);
	dateObj.setMonth(dateObj.getMonth() - 1);
	date = formatDay(dateObj);
	addDate(date);
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

export async function addInfoOfDay(income, today, category) {
	const data = JSON.stringify({ income, today, category });
	await fetch('api/writeDayInfo', {
		method: 'POST',
		body: data,
		headers: {
			'content-type': 'application/json'
		}
	});
	location.reload();
}

export async function addInfoOfDayExpense(expense, today, category) {
	const data = JSON.stringify({ expense, today, category });
	await fetch('api/writeDayInfoExpense', {
		method: 'POST',
		body: data,
		headers: {
			'content-type': 'application/json'
		}
	});
	location.reload();
}