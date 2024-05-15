import { writable } from 'svelte/store';

export const selected_income_category = writable();
export const selected_expense_categoru = writable();
export const income_categories = writable(['Salary', 'Bonus', 'Pension', 'Other']);
export const expense_categories = writable([
	'Food',
	'Shopping',
	'Home',
	'Family',
	'Travels',
	'Transportation',
	'Health',
	'Entertainment',
	'Other'
]);
