<script>
	import { icons } from '../stores/categoriesStore';
	import { fade } from 'svelte/transition';
	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { income_categories } from '../stores/categoriesStore';
	import { expense_categories } from '../stores/categoriesStore';

	let add_new_category = false;
	let show_income = true;
	let show_expense = false;

	const handleDisplayCategoriesIn = () => {
		show_income = true;
		show_expense = false;
	};

	const handleDisplayCategoriesEx = () => {
		show_income = false;
		show_expense = true;
	};
</script>

<!-- Icon list -->
{#if add_new_category}
	<div class="transparent-div" transition:fade>
		<div
			class="categories-div"
			style="width: 596px;"
			in:fly={{
				y: 100,
				easing: backOut
			}}
			out:fly={{
				y: 300
			}}
		>
			<h2 class="text-2xl font-semibold pb-4">SELECT ICON</h2>
			{#each $icons as icon}
				<button
					class="w-32 h-20 items-center ml-2 mr-2 mb-2 hover:bg-slate-200 hover:scale-105 dark:hover:bg-zinc-600 rounded-lg transition-all duration-300"
				>
					<span class="material-symbols-outlined"> {icon.icon} </span>
					<p>{icon.name}</p>
				</button>
			{/each}

			<div>
				<button class="close-blue-button" on:click={() => (add_new_category = !add_new_category)}
					>CLOSE</button
				>
			</div>
		</div>
	</div>
{/if}
<!-- Icon list -->

<div class="transactions-div w-4/5 h-full ml-auto flex flex-col pb-36 pt-24 space-y-8 items-center">
	<!-- Showing the categories -->
	<div class="w-full">
		<!-- Income or expense ? -->
		<div class="flex justify-between text-2xl">
			<button
				on:click={() => {
					handleDisplayCategoriesIn();
				}}
				class="w-2/4 {show_income ? 'border-b dark:border-zinc-600' : ''}">Income</button
			>
			<button
				on:click={() => handleDisplayCategoriesEx()}
				class="w-2/4 {show_expense ? 'border-b dark:border-zinc-600' : ''}">Expense</button
			>
		</div>
		<!-- Income or expense ? -->

		<!-- Income or expense categories -->
		{#if show_income}
			<div
				class="pt-8 space-y-2"
				in:fly={{
					y: 50,
					easing: backOut
				}}
			>
				{#each $income_categories as income_categories}
					<button class="show-categories">
						<div class="category-content">
							<span class="material-symbols-outlined">{income_categories.icon}</span>
							<p>{income_categories.name}</p>
						</div>
						<button>
							<span class="material-symbols-outlined p-2"> more_vert </span>
						</button>
					</button>
				{/each}
			</div>
		{/if}

		{#if show_expense}
			<div
				class="pt-8 space-y-2"
				in:fly={{
					y: 50,
					easing: backOut
				}}
			>
				{#each $expense_categories as expense_categories}
					<button class="show-categories">
						<div class="category-content">
							<span class="material-symbols-outlined">{expense_categories.icon}</span>
							<p>{expense_categories.name}</p>
						</div>
						<button>
							<span class="material-symbols-outlined p-2"> more_vert </span>
						</button>
					</button>
				{/each}
			</div>
		{/if}
	</div>
	<!-- Showing the categories -->

	<!-- Add new category button -->
	<button
		on:click={() => (add_new_category = !add_new_category)}
		class=" pl-3 pr-2 flex w-48 border rounded-lg space-x-2 border-blue-500 h-10 bg-blue-500 hover:bg-blue-400 text-white
		transition-all hover:scale-110 duration-300 {show_expense
			? 'bg-red-500 border-red-500 hover:bg-red-400'
			: ''}"
	>
		<p class="text-3xl">+</p>
		<p class="pt-2">Add new category</p>
	</button>
	<!-- Add new category button -->
</div>
