import { writable } from 'svelte/store';
import { supabase } from '$lib/database/supabaseClient.js';

export const money = writable([]);

export const loadMoney = async () => {
	const { data, error } = await supabase.from('money').select();

	if (error) {
		return console.error(error);
	}
	money.set(data);
};

export const addIncome = async (income, day_id, category, user_id) => {
	const { data, error } = await supabase
		.from('money')
		.insert([{ money_id: crypto.randomUUID(), income, day_id, category, user_id }]);

	if (error) {
		return console.error(error);
	}
	loadMoney();
	money.update((cur) => [...cur, data[0]]);
};

export const addExpense = async (expense, day_id, category, user_id) => {
	const { data, error } = await supabase
		.from('money')
		.insert([{ money_id: crypto.randomUUID(), expense, day_id, category, user_id }]);

	if (error) {
		return console.error(error);
	}

	loadMoney();
	money.update((cur) => [...cur, data[0]]);
};

export const deleteIncome = async (money_id) => {
	const { error } = await supabase.from('money').delete().match({ money_id });

	money.update((money) => money.filter((mon) => mon.money_id != money_id));

	if (error) {
		return console.error(error);
	}
};
