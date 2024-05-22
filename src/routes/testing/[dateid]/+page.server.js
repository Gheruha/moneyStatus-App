import { date } from '../../stores/dateStore';

export async function load({ params }) {
	const id = params.date;
	console.log(date);
	return { data: id };
}
