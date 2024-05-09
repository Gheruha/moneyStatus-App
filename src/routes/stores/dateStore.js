import { writable } from 'svelte/store';

export const date = writable(new Date());

export const increaseMonth = (new_date) => {
	const date_obj = new Date(new_date);
	date_obj.setMonth(date_obj.getMonth() + 1);
	date.set(date_obj);
};

export const decreaseMonth = (new_date) => {
	const date_obj = new Date(new_date);
	date_obj.setMonth(date_obj.getMonth() - 1);
	date.set(date_obj);
};
