// @ts-nocheck
import { mysqlConnectionFn } from '$lib/database/mysql';
import { formatDay } from '$lib/components/formattingDay.js';

export async function load() {
	let connection_object = [];
	let mysqlConnection = await mysqlConnectionFn();
	// object & mysql
	try {
		await mysqlConnection
			.query('select distinct day_id from money;')
			.then(function ([rows, fields]) {
				for (let i = 0; i < rows.length; i++) {
					const days = rows[i];
					console.log(rows[i]);
					const formatted_days = formatDay(days['day_id']);
					connection_object.push(formatted_days);
					connection_object = connection_object;
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
