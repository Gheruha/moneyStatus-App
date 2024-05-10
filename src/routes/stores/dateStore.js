import { writable } from 'svelte/store';

export let date = writable(new Date());

export const increaseMonth = (new_date) => {
	const date_obj = new Date(new_date);
	date_obj.setMonth(date_obj.getMonth() + 1);
	date.update((current_date) => {
		current_date.setMonth(current_date.getMonth() + 1);
		return current_date;
	});
};

export const decreaseMonth = (new_date) => {
	const date_obj = new Date(new_date);
	date_obj.setMonth(date_obj.getMonth() - 1);
	date.set(date_obj);
};
