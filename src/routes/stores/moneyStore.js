import { writable } from 'svelte/store';
import { supabase } from '$lib/database/supabaseClient.js';

export const incomes = writable([]);

export const loadIncomes = async () => {
	const { data, error } = await supabase.from('money').select();

	if (error) {
		return console.error(error);
	}
	incomes.set(data);
};

loadIncomes();
export const addIncome = async (income) => {
	const { data, error } = await supabase
		.from('money')
		.insert([{ money_id: crypto.randomUUID(), income, user_id: crypto.randomUUID() }]);

	if (error) {
		return console.error(error);
	}

	incomes.update((cur) => [...cur, data[0]]);
};

export const deleteIncome = async (money_id) => {
	const { error } = await supabase.from('money').delete().match({ money_id });

	incomes.update((incomes) => incomes.filter((income) => income.money_id != money_id));

	if (error) {
		return console.error(error);
	}
};
