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
	let show_icons = false;
	let selected_icon = { name: 'SELECT AN ICON', icon: 'other_admission' };

	const set_icon = (name, icon) => {
		selected_icon.name = name;
		selected_icon.icon = icon;
		show_icons = false;
	};

	const handleDisplayCategoriesIn = () => {
		show_income = true;
		show_expense = false;
	};

	const handleDisplayCategoriesEx = () => {
		show_income = false;
		show_expense = true;
	};

	const handleClose = () => {
		add_new_category = false;
		selected_icon = { name: 'SELECT AN ICON', icon: 'other_admission' };
	};
</script>

<!-- Add new category form -->
{#if add_new_category}
	<div class="transparent-div" transition:fade>
		<div
			class="categories-div"
			style="width: 396px; height:264px"
			in:fly={{
				y: 100,
				easing: backOut
			}}
			out:fly={{
				y: 300
			}}
		>
			<h2 class="text-2xl font-semibold pb-4">ADD NEW CATEGORY</h2>
			<form>
				<div class="flex justify-center">
					<label class="label-money-data flex justify-between w-4/5">
						<div class="pt-1">
							<div class="w-10 h-10 border rounded-full pt-2">
								<span class="material-symbols-outlined">{selected_icon.icon}</span>
							</div>
						</div>
						<button class="input-ui" style="width: 80%;" on:click={() => (show_icons = !show_icons)}
							>{selected_icon.name}</button
						>
					</label>
				</div>
				<br />

				<label class="label-money-data">
					Category Name:
					<input type="text" class="input-ui" placeholder="ex. Vacation" />
				</label>

				<div class="pt-5">
					<button class="close-blue-button" on:click={() => handleClose()}>CLOSE</button>
				</div>
			</form>
		</div>
	</div>
{/if}
<!-- Add new category form -->

<!-- Icon list -->
{#if show_icons}
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
					on:click={set_icon(icon.name, icon.icon)}
					class="w-32 h-20 items-center ml-2 mr-2 mb-2 hover:bg-slate-200 hover:scale-105 dark:hover:bg-zinc-600 rounded-lg transition-all duration-300"
				>
					<span class="material-symbols-outlined"> {icon.icon} </span>
					<p>{icon.name}</p>
				</button>
			{/each}

			<div>
				<button class="close-blue-button" on:click={() => (show_icons = !show_icons)}>CLOSE</button>
			</div>
		</div>
	</div>
{/if}
<!-- Icon list -->

<div class="transactions-div w-4/5 h-full ml-auto flex flex-col pb-36 pt-24 space-y-8 items-center">
	<!-- Showing the categories -->
	<div class="w-full">
		<!-- Income or expense ? -->
		<div class="flex justify-between text-2xl font-semibold">
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
					<div class="show-categories">
						<div class="category-content">
							<span class="material-symbols-outlined">{income_categories.icon}</span>
							<p>{income_categories.name}</p>
						</div>
						<button>
							<span class="material-symbols-outlined p-2"> more_vert </span>
						</button>
					</div>
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
					<div class="show-categories">
						<div class="category-content">
							<span class="material-symbols-outlined">{expense_categories.icon}</span>
							<p>{expense_categories.name}</p>
						</div>
						<button>
							<span class="material-symbols-outlined p-2"> more_vert </span>
						</button>
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<!-- Showing the categories -->

	<!-- Add new category button -->
	<button
		on:click={() => (add_new_category = !add_new_category)}
		class=" pl-3 pr-2 flex w-48 border rounded-lg space-x-2 border-blue-500 h-10 bg-blue-500 hover:bg-blue-400 text-white
		transition-colors duration-300 {show_expense ? 'bg-red-500 border-red-500 hover:bg-red-400' : ''}"
	>
		<p class="text-3xl">+</p>
		<p class="pt-2">Add new category</p>
	</button>
	<!-- Add new category button -->
</div>
