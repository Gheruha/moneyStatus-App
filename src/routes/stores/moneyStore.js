import { writable } from 'svelte/store';
import { supabase } from '$lib/database/supabaseClient.js';
import { date } from './dateStore';

// Getting year and month
const getYearAndMonth = (date_string) => {
	return date_string.slice(0, 7);
};

const formatDateStore = (date_string) => {
	const dateObj = new Date(date_string);
	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, '0');

	return `${year}-${month}`;
};
import { derived } from 'svelte/store';

export const money = writable([]);

export const loadMoney = async () => {
	const { data, error } = await supabase.from('money').select();

	if (error) {
		return console.error(error);
	}
	money.set(data);
};

export const filteredMoney = derived([money, date], ([allMoney, selectedDate]) => {
	const yearMonth = formatDateStore(selectedDate);
	return allMoney.filter((entry) => getYearAndMonth(entry.day_id) === yearMonth);
});

export const addIncome = async (income, day_id, category, user_id) => {
	const { data, error } = await supabase
		.from('money')
		.insert([{ money_id: crypto.randomUUID(), income, day_id, category, user_id }]);

	if (error) {
		return console.error(error);
	}
	loadMoney();
};

export const addExpense = async (expense, day_id, category, user_id) => {
	const { data, error } = await supabase
		.from('money')
		.insert([{ money_id: crypto.randomUUID(), expense, day_id, category, user_id }]);

	if (error) {
		return console.error(error);
	}

	loadMoney();
};

export const deleteIncome = async (money_id) => {
	const { error } = await supabase.from('money').delete().match({ money_id });

	money.update((money) => money.filter((mon) => mon.money_id != money_id));

	if (error) {
		return console.error(error);
	}
};
