import { writable } from 'svelte/store';

export const selected_income_category = writable();
export const selected_expense_categoru = writable();
export const income_categories = writable([
	{ name: 'Salary', icon: 'work' },
	{ name: 'Pension', icon: 'elderly' },
	{ name: 'Bonus', icon: 'redeem' },
	{ name: 'Other', icon: 'other_admission' }
]);
export const expense_categories = writable([
	{ name: 'Food', icon: 'restaurant' },
	{ name: 'Shopping', icon: 'shopping_cart' },
	{ name: 'Home', icon: 'home' },
	{ name: 'Family', icon: 'family_restroom' },
	{ name: 'Travels', icon: 'travel' },
	{ name: 'Transportation', icon: 'local_taxi' },
	{ name: 'Health', icon: 'health_and_safety' },
	{ name: 'Entertainment', icon: 'attractions' },
	{ name: 'Family', icon: 'family_restroom' },
	{ name: 'Other', icon: 'other_admission' }
]);

export const icons = writable([
	{ name: 'Salary', icon: 'work' },
	{ name: 'Pension', icon: 'elderly' },
	{ name: 'Bonus', icon: 'redeem' },
	{ name: 'Other', icon: 'other_admission' },
	{ name: 'Food', icon: 'restaurant' },
	{ name: 'Shopping', icon: 'shopping_cart' },
	{ name: 'Home', icon: 'home' },
	{ name: 'Family', icon: 'family_restroom' },
	{ name: 'Travels', icon: 'travel' },
	{ name: 'Transportation', icon: 'local_taxi' },
	{ name: 'Health', icon: 'health_and_safety' },
	{ name: 'Entertainment', icon: 'attractions' },
	{ name: 'Family', icon: 'family_restroom' },
	{ name: 'Other', icon: 'other_admission' }
]);
