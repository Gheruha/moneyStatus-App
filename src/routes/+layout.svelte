<script lang=" ts">
	// imports
	export let data;
	import '../app.css';
	import { onMount } from 'svelte';
	import { formatDay } from '$lib/components/globalFunctions.js';
	import { fade } from 'svelte/transition';
	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { page } from '$app/stores';
	import { user } from './stores/authStore';
	import { supabase } from '$lib/database/supabaseClient.js';
	import { loadMoney } from './stores/moneyStore';
	import { addIncome } from './stores/moneyStore';
	import { addExpense } from './stores/moneyStore';
	import { income_categories } from './stores/categoriesStore';
	import { expense_categories } from './stores/categoriesStore';

	// Components
	import ThemeSwitch from '$lib/themeSwitch/themeSwitch.svelte';
	import GoToActualMonth from '$lib/components/goToActualMonth.svelte';
	import Auth from '$lib/components/Auth.svelte';

	user.set(supabase.auth.getUser());
	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session?.user);

		if (session?.user) {
			loadMoney();
		}
	});

	// local
	let currentPage;
	$: currentPage = $page.url.pathname;
	let addInfo = false;
	let addInfoExp = false;
	let displayIncomeCategories = false;
	let displayExpenseCategories = false;
	let showActualMonth = true;
	let showAccountOptions = false;
	let income = 1;
	let expense = 1;
	let category;
	let today = '';
	let navLinks = [
		{ path: '/', label: 'Daily', icon: 'early_on' },
		{ path: '/calendar', label: 'Calendar', icon: 'calendar_month' },
		{ path: '/analytics', label: 'Analytics', icon: 'analytics' },
		{ path: '/categories', label: 'Categories', icon: 'category' },
		{ path: '/testing', label: 'Testing', icon: 'handyman' }
	];

	// functions
	const logOut = () => {
		console.log('Log Out');
		supabase.auth.signOut();
	};

	const handleIncome = (income, today, category, user) => {
		addIncome(income, today, category, user);
		addInfoDiv();
	};

	const handleExpense = (expense, today, category, user) => {
		addExpense(expense, today, category, user);
		addInfoExpenseDiv();
	};

	const addInfoDiv = () => {
		addInfo = !addInfo;
		showActualMonth = !showActualMonth;
		income = 1;
		category = null;
	};

	const addInfoExpenseDiv = () => {
		addInfoExp = !addInfoExp;
		showActualMonth = !showActualMonth;
		expense = 1;
		category = null;
	};

	const handleSelectedCategoryIn = (selected_category) => {
		displayIncomeCategories = !displayIncomeCategories;
		category = selected_category;
	};

	const handleSelectedCategoryEx = (selected_category) => {
		displayExpenseCategories = !displayExpenseCategories;
		category = selected_category;
	};

	onMount(() => {
		updateDate();
		const intervalId = setInterval(updateDate, 320000); // update every 5 minutes

		// Optionally, clear the interval on component unmount
		return () => clearInterval(intervalId);
	});

	const updateDate = () => {
		const date = new Date();
		today = formatDay(date);
	};
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
/>
<!-- Main Div -->
<div class="w-full h-full flex">
	<!-- Check if there is a user session-->
	{#if $user}
		<!-- LogOut Button -->
		<div class="flex justify-end w-full fixed p-4">
			<div transition:fade class="w-2/5 items-end text-center flex flex-col justify-center">
				<button on:click={() => (showAccountOptions = !showAccountOptions)}
					><span class="material-symbols-outlined icon" style="font-size:40px">
						account_circle
					</span></button
				>
				{#if showAccountOptions}
					<div
						class="p-2 border rounded-lg bg-slate-50 shadow-lg dark:bg-zinc-800 dark:border-zinc-600 space-y-1"
						in:fly={{
							y: -40,
							easing: backOut
						}}
						out:fly={{
							y: -10
						}}
					>
						<p class="border-b border-slate-300 dark:border-zinc-600">{$user.email}</p>
						<button
							on:click={logOut}
							class="p-1 w-full border rounded-lg border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 transition-all hover:scale-110 duration-300"
							>Log Out</button
						>
					</div>
				{/if}
			</div>
		</div>
		<!-- LogOut Button -->

		<!-- Menu -->
		<div
			class="menu w-1/5 h-full fixed bg-slate-100 flex flex-col justify-between text-left dark:bg-zinc-800"
		>
			<div class="w-full flex flex-col space-y-2 mt-6 pt-8">
				{#each navLinks as link}
					<a
						href={link.path}
						class="focus:outline-none flex text-blue-500 hover:bg-blue-400 hover:text-white font-medium rounded-sm ml-4 mr-4 px-3 py-2 transition-all hover:scale-110 duration-300 space-x-2
				{currentPage === link.path ? 'text-white bg-blue-500' : ''}"
					>
						<span class="material-symbols-outlined"> {link.icon} </span>
						<p style="padding-top: 1px;">{link.label}</p>
					</a>
				{/each}
			</div>

			<div class="flex">
				<div
					class="pb-12 text-center flex opacity-0 hover:opacity-100 transition-opacity duration-300"
				>
					<ThemeSwitch />
				</div>
			</div>
		</div>
		<!-- Menu -->

		<!-- Info forms-->
		<!-- Income form -->
		{#if addInfo}
			<div class="transparent-div" transition:fade>
				<div
					class="add-money-data"
					in:fly={{
						y: 100,
						easing: backOut
					}}
					out:fly={{
						y: 300
					}}
				>
					<div>
						<h2 class="text-2xl font-semibold pb-6">NEW INCOME</h2>
					</div>
					<form class="flex flex-col">
						<label for="" class="label-money-data">
							Category: <br />
							<button
								type="text"
								class="input-ui"
								on:click={() => (displayIncomeCategories = !displayIncomeCategories)}
								>{category ?? 'SELECT INCOME CATEGORY'}
							</button>
						</label><br />
						<label for="" class="label-money-data">
							Value $: <br />
							<input type="number" min="1" class="input-ui" bind:value={income} />
						</label><br />
						<label for="" class="label-money-data">
							Date: <br />
							<input type="date" class="input-ui" bind:value={today} />
						</label><br />
					</form>
					<div class="items-center flex justify-center space-x-4">
						<button on:click={() => addInfoDiv()} class="close-blue-button"> CLOSE </button>
						{#if category && income > 0}
							<button
								on:click={handleIncome(income, today, category, $user.id)}
								class="w-20 h-10 border rounded-lg border-blue-500 bg-blue-500 text-white hover:bg-blue-400 transition-all hover:scale-110 duration-300"
							>
								ADD
							</button>
						{/if}
					</div>
				</div>
			</div>
		{/if}
		<!-- Income form -->

		<!-- Displaying Income Categories-->
		{#if displayIncomeCategories}
			<div class="transparent-div" transition:fade>
				<div
					class="categories-div"
					in:fly={{
						y: 100,
						easing: backOut
					}}
					out:fly={{
						y: 300
					}}
				>
					<h2 class="text-2xl font-semibold pb-6">INCOME CATEGORIES</h2>

					<!-- Categories Div -->
					<div class="flex flex-col space-y-2 p-4">
						{#each $income_categories as income_categories}
							<button
								on:click={() => handleSelectedCategoryIn(income_categories.name)}
								class="p-2 flex border space-x-2 rounded-lg bg-slate-100 shadow-sm hover:bg-slate-200 dark:bg-zinc-700 dark:border-zinc-600 dark:hover:bg-zinc-500 transition-colors duration-300"
							>
								<span class="material-symbols-outlined">{income_categories.icon}</span>
								<p>{income_categories.name}</p>
							</button>
						{/each}
					</div>
					<!-- Categories Div -->

					<div>
						<button
							class="close-blue-button"
							on:click={() => (displayIncomeCategories = !displayIncomeCategories)}>CLOSE</button
						>
					</div>
				</div>
			</div>
		{/if}
		<!-- Displaying Income Categories-->

		<!-- Expense form -->
		{#if addInfoExp}
			<div class="transparent-div" transition:fade>
				<div
					class="add-money-data"
					in:fly={{
						y: 100,
						easing: backOut
					}}
					out:fly={{
						y: 300
					}}
				>
					<div>
						<h2 class="text-2xl font-semibold pb-6">NEW EXPENSE</h2>
					</div>
					<form action="" class="flex flex-col">
						<label for="" class="label-money-data">
							Category: <br />
							<button
								type="text"
								class="input-ui"
								on:click={() => (displayExpenseCategories = !displayExpenseCategories)}
								>{category ?? 'SELECT EXPENSE CATEGORY'}
							</button>
						</label><br />
						<label for="" class="label-money-data">
							Value $: <br />
							<input type="number" min="1" class="input-ui" bind:value={expense} />
						</label><br />
						<label for="" class="label-money-data">
							Date: <br />
							<input type="date" class="input-ui" bind:value={today} />
						</label><br />
					</form>
					<div class="items-center flex justify-center space-x-4">
						<button on:click={() => addInfoExpenseDiv()} class="close-red-button"> CLOSE </button>
						{#if category && expense > 0}
							<button
								on:click={() => handleExpense(expense, formatDay(today), category, $user.id)}
								class="red-button"
							>
								ADD
							</button>
						{/if}
					</div>
				</div>
			</div>
		{/if}
		<!-- Expense form -->

		<!-- Displaying Expense Categories-->
		{#if displayExpenseCategories}
			<div class="transparent-div" transition:fade>
				<div
					class="categories-div"
					in:fly={{
						y: 100,
						easing: backOut
					}}
					out:fly={{
						y: 300
					}}
				>
					<h2 class="text-2xl font-semibold">EXPENSE CATEGORIES</h2>

					<!-- Categories Div -->
					<div class="flex flex-col space-y-2 p-4">
						{#each $expense_categories as expense_categories}
							<button
								on:click={() => handleSelectedCategoryEx(expense_categories.name)}
								class="p-2 flex border space-x-2 rounded-lg bg-slate-100 shadow-sm hover:bg-slate-200 dark:bg-zinc-700 dark:border-zinc-600 dark:hover:bg-zinc-500 transition-colors duration-300"
							>
								<span class="material-symbols-outlined">{expense_categories.icon}</span>
								<p>{expense_categories.name}</p>
							</button>
						{/each}
					</div>
					<!-- Categories Div -->

					<div>
						<button
							class="close-red-button"
							on:click={() => (displayExpenseCategories = !displayExpenseCategories)}>CLOSE</button
						>
					</div>
				</div>
			</div>
		{/if}
		<!-- Displaying Expense Categories-->
		<!-- Info forms-->

		<!-- Content -->
		{#key data.url}
			<div in:fly={{ y: -100, duration: 250 }} class="w-full h-full">
				<slot />
			</div>
		{/key}
		<!-- Content -->

		<!-- Add income & expense buttons -->
		<div class="fixed bottom-12 right-10">
			<button
				on:click={() => addInfoExpenseDiv()}
				class="p-2 border rounded-full text-2xl w-16 h-16 text-center bg-red-500 border-red-500 text-white transition-all hover:scale-110 hover:bg-red-400 duration-300 {addInfo ==
				true
					? 'button-not-allowed'
					: ''}
			"
				disabled={addInfo}
			>
				-
			</button>
		</div>
		<div class="fixed bottom-32 right-10">
			<button
				on:click={() => addInfoDiv()}
				class="p-2 border rounded-full text-2xl w-16 h-16 text-center bg-blue-500 border-blue-500 text-white transition-all hover:scale-110 hover:bg-blue-400 duration-300 {addInfoExp ==
				true
					? 'button-not-allowed'
					: ''}
				"
				disabled={addInfoExp}
			>
				+
			</button>
		</div>
		<!-- Add income & expense buttons -->

		<!-- Go to Actual Month Button-->
		<GoToActualMonth {showActualMonth} />

		<!-- Auth page if there is no user session -->
	{:else}
		<div class="w-full h-full flex justify-center pt-52">
			<Auth />
		</div>
	{/if}
	<!-- Auth page if there is no user session -->
</div>
