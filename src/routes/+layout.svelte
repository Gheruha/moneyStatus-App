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
	let showActualMonth = true;
	let showAccountOptions = false;
	let income = 0;
	let expense, category;
	let today = '';
	let navLinks = [
		{ path: '/', label: 'Daily' },
		{ path: '/calendar', label: 'Calendar' },
		{ path: '/statistics', label: 'Statistics' },
		{ path: '/testing', label: 'Testing' }
	];

	// functions
	const logOut = () => {
		console.log('Log Out');
		supabase.auth.signOut();
	};

	const handleIncome = (income, today, category, user) => {
		addIncome(income, today, category, user);
		income = 0;
		addInfoDiv();
	};

	function addInfoDiv() {
		addInfo = !addInfo;
		showActualMonth = !showActualMonth;
	}

	function addInfoExpense() {
		addInfoExp = !addInfoExp;
		showActualMonth = !showActualMonth;
	}

	onMount(() => {
		updateDate();
		const intervalId = setInterval(updateDate, 320000); // update every 5 minutes

		// Optionally, clear the interval on component unmount
		return () => clearInterval(intervalId);
	});

	function updateDate() {
		const date = new Date();
		today = formatDay(date);
	}
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
			class="menu w-1/5 h-full fixed bg-slate-100 flex flex-col justify-between items-center dark:bg-zinc-800"
		>
			<div class="w-full flex flex-col space-y-2 mt-6 pt-8">
				{#each navLinks as link}
					<a
						href={link.path}
						class="focus:outline-none text-blue-500 hover:bg-blue-400 hover:text-white font-medium rounded-sm ml-4 mr-4 px-3 py-2 transition-all hover:scale-110 duration-300
					{currentPage === link.path ? 'text-white bg-blue-500' : ''}"
					>
						{link.label}
					</a>
				{/each}
			</div>

			<div class="flex">
				<p class="text-slate-400 dark:text-zinc-600">Theme Switch</p>
				<div
					class="pb-12 text-center flex opacity-0 hover:opacity-100 transition-opacity duration-300"
				>
					<ThemeSwitch />
				</div>
			</div>
		</div>
		<!-- Menu -->

		<!-- Info forms-->
		{#if addInfo}
			<div
				class="flex fixed w-full h-full justify-center items-center"
				style="background-color: rgba(0,0,0,0.5);"
				transition:fade
			>
				<div
					class="flex flex-col justify-center align-middle w-1/4 h-2/4 border rounded-lg shadow-lg dark:border-zinc-600 bg-slate-100 dark:bg-zinc-800"
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
						<label for="" class="text-slate-500 text-md dark:text-zinc-300">
							Income $: <br />
							<input
								type="number"
								class="bg-slate-100 text-zinc-800 p-2 w-4/5 border border-slate-700 dark:border-zinc-600 dark:text-slate-100 rounded-lg dark:bg-zinc-800"
								bind:value={income}
							/>
						</label><br />
						<label for="" class="text-slate-500 text-md dark:text-zinc-300">
							Category: <br />
							<input
								type="text"
								class="bg-slate-100 text-zinc-800 p-2 w-4/5 border border-slate-700 rounded-lg dark:border-zinc-600 dark:text-slate-100 dark:bg-zinc-800"
								bind:value={category}
							/>
						</label><br />
						<label for="" class="text-slate-500 text-md dark:text-zinc-300">
							Date: <br />
							<input
								type="date"
								class="bg-slate-100 text-zinc-800 p-2 w-4/5 border border-slate-700 rounded-lg dark:border-zinc-600 dark:text-slate-100 dark:bg-zinc-800"
								bind:value={today}
							/>
						</label><br />
					</form>
					<div class="items-center flex justify-center space-x-4">
						<button
							on:click={() => addInfoDiv()}
							class="w-1/5 border rounded-lg border-blue-500 text-blue-600 hover:text-blue-600 hover:bg-blue-300 transition-all hover:scale-110 duration-300"
						>
							CLOSE
						</button>
						<button
							on:click={handleIncome(income, today, category, $user.id)}
							class="w-1/5 border rounded-lg border-blue-500 bg-blue-500 text-white hover:bg-blue-400 transition-all hover:scale-110 duration-300"
						>
							ADD
						</button>
					</div>
				</div>
			</div>
		{/if}
		{#if addInfoExp}
			<div
				class="flex fixed w-full h-full justify-center items-center"
				style="background-color: rgba(0,0,0,0.5);"
				transition:fade
			>
				<div
					class="flex flex-col justify-center align-middle w-1/4 h-2/4 border rounded-lg shadow-lg dark:border-zinc-600 bg-slate-100 dark:bg-zinc-800"
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
						<label for="" class="text-slate-500 text-md dark:text-zinc-300">
							Expense $: <br />
							<input
								type="number"
								class="bg-slate-100 text-zinc-800 p-2 w-4/5 border border-slate-700 dark:border-zinc-600 dark:text-slate-100 rounded-lg dark:bg-zinc-800"
								bind:value={expense}
							/>
						</label><br />
						<label for="" class="text-slate-500 text-md dark:text-zinc-300">
							Category: <br />
							<input
								type="text"
								class="bg-slate-100 text-zinc-800 p-2 w-4/5 border border-slate-700 rounded-lg dark:border-zinc-600 dark:text-slate-100 dark:bg-zinc-800"
								bind:value={category}
							/>
						</label><br />
						<label for="" class="text-slate-500 text-md dark:text-zinc-300">
							Date: <br />
							<input
								type="date"
								class="bg-slate-100 text-zinc-800 p-2 w-4/5 border border-slate-700 rounded-lg dark:border-zinc-600 dark:text-slate-100 dark:bg-zinc-800"
								bind:value={today}
							/>
						</label><br />
					</form>
					<div class="items-center flex justify-center space-x-4">
						<button
							on:click={() => addInfoExpense()}
							class="w-1/5 border rounded-lg border-red-500 text-red-600 hover:text-red-600 hover:bg-red-300 transition-all hover:scale-110 duration-300"
						>
							CLOSE
						</button>
						<button
							on:click={() => addExpense(expense, formatDay(today), category, $user.id)}
							class="w-1/5 border rounded-lg border-red-500 bg-red-500 text-white hover:bg-red-400 transition-all hover:scale-110 duration-300"
						>
							ADD
						</button>
					</div>
				</div>
			</div>
		{/if}
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
				on:click={() => addInfoExpense()}
				class="p-2 border rounded-full text-2xl w-16 h-16 text-center bg-red-500 border-red-500 text-white transition-all hover:scale-110 hover:bg-red-400 duration-300 {addInfo ==
				true
					? 'cursor-not-allowed bg-slate-100 border-slate-200 hover:bg-slate-200 text-black dark:bg-zinc-600 dark:border-zinc-700 dark:text-white'
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
					? 'cursor-not-allowed bg-slate-100 border-slate-200 hover:bg-slate-200 text-black dark:bg-zinc-600 dark:border-zinc-700 dark:text-white'
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
