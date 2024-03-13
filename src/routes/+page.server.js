// @ts-nocheck
import { mysqlConnectionFn } from '$lib/database/mysql';
import { formatDay } from '$lib/components/formattingDay.js';

export async function load() {
	let mysqlConnection = await mysqlConnectionFn();
	// object & mysql
	let connection_object = [];
	try {
		let result = await mysqlConnection
			.query('select distinct day_id from money;')
			.then(function ([rows, fields]) {
				for (let i = 0; i < rows.length; i++) {
					const days = rows[i];
					const formatted_days = formatDay(days['day_id']);
					connection_object.push(formatted_days);
				}
				console.log(connection_object);
				return rows;
			});

		return {
			data: connection_object
		};
	} catch (error) {
		console.error('Database Server Error.');
		console.log('Database Server Error.');
		console.log(error);
	}
}
