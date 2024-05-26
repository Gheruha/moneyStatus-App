import { writable } from 'svelte/store';
import { supabase } from '$lib/database/supabaseClient.js';
import { date } from './dateStore';

export const money = writable(new Map());
export let month_input = null;
export let year_input = null;
let stored_keys = [];
let key;

export const loadMoney = async () => {
	let { data, error } = await supabase.rpc('getmoney', {
		month_input,
		year_input
	});

	if (data.length > 0) {
		money.update((currentMap) => {
			currentMap.set(key, data);
			return currentMap;
		});
		if (!stored_keys.includes(key)) {
			stored_keys.push(key);
		}
	}

	if (stored_keys.length > 6) {
		for (let i = 0; i < stored_keys.length - 1; i++) {
			money.update((currentMap) => {
				currentMap.delete(stored_keys[i]);
				return currentMap;
			});
		}
		stored_keys = stored_keys.slice(-1);
	}

	if (error) {
		return console.error(error);
	}
};

// Verifying if there is already this data
date.subscribe((newDate) => {
	month_input = newDate.getMonth() + 1;
	year_input = newDate.getFullYear();
	key = `${month_input}${year_input}`;
	if (!stored_keys.includes(key)) {
		loadMoney();
	}
});

export const addIncome = async (income, day_id, category, user_id) => {
	const money_id = crypto.randomUUID();
	const { error } = await supabase
		.from('money')
		.insert([{ money_id, income, day_id, category, user_id }]);

	if (error) {
		window.alert(error);
		return console.error(error);
	} else {
		money.update((currentMap) => {
			const currentEntries = currentMap.get(key) || [];
			currentEntries.push({ money_id, income, day_id, category, user_id });
			return currentMap.set(key, currentEntries);
		});
	}
};

export const addExpense = async (expense, day_id, category, user_id) => {
	const money_id = crypto.randomUUID();
	const { error } = await supabase
		.from('money')
		.insert([{ money_id, expense, day_id, category, user_id }]);

	if (error) {
		window.alert(error);
		return console.error(error);
	} else {
		money.update((currentMap) => {
			const currentEntries = currentMap.get(key) || [];
			currentEntries.push({ money_id, expense, day_id, category, user_id });
			return currentMap.set(key, currentEntries);
		});
	}
};

export const deleteData = async (money_id) => {
	const { error } = await supabase.from('money').delete().match({ money_id });

	if (error) {
		window.alert(error);
		return console.error(error);
	} else {
		money.update((currentMap) => {
			for (const [k, v] of currentMap.entries()) {
				currentMap.set(
					k,
					v.filter((entry) => entry.money_id !== money_id)
				);
			}
			return currentMap;
		});
	}
};
