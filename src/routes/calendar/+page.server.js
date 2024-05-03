// @ts-nocheck
import { mysqlConnectionFn } from '$lib/database/mysql';
import { formatDay } from '$lib/components/globalFunctions.js';

export async function load() {
	let mysqlConnection = await mysqlConnectionFn();

	const [dayRows] = await mysqlConnection.query(
		'select * from selectedDate order by id desc limit 1'
	);
	const dayObj = dayRows[0];
	let selectedDate = new Date(dayObj.selected_date);
	// const month = selectedDate.getMonth() + 1;
	// const year = selectedDate.getFullYear();
	selectedDate = formatDay(selectedDate);

	return {
		data: selectedDate
	};
}
