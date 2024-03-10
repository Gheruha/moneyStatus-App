<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import icon from '$lib/images/moneyStatus.png';

	let addInfo = false;
	let income, expense, category;
	let today = '';

	function addInfoDiv() {
		addInfo = !addInfo;
	}

	onMount(() => {
		updateDate();
		const intervalId = setInterval(updateDate, 60000); // Update every second

		// Optionally, clear the interval on component unmount
		return () => clearInterval(intervalId);
	});

	function updateDate() {
		const date = new Date();
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Adjusted for correct month (0-indexed)
		const year = String(date.getFullYear());

		today = `${year}-${month}-${day}`;
	}

	async function addInfoOfDay(income, expense, today, category) {
		const data = JSON.stringify({ income, expense, today, category });
		const response = await fetch('api/writeDayInfo', {
			method: 'POST',
			body: data,
			headers: {
				'content-type': 'application/json'
			}
		});
	}
</script>

<!-- Main Div -->
<div class="w-full h-full flex">
	<!-- Menu -->
	<div class="w-1/5 h-full fixed bg-gray-50 flex flex-col justify-start items-center">
		<div class="w-full flex flex-col space-y-2 mt-6">
			<button
				class="focus:outline-none underline text-red-500 hover:bg-red-400 hover:text-white focus:ring-1 focus:ring-red-300 font-medium rounded-sm ml-4 mr-4 text-sm px-3 py-2 transition-all hover:scale-110 duration-300"
				><p>Daily</p></button
			>
			<button
				class="focus:outline-none underline text-red-500 hover:bg-red-400 hover:text-white focus:ring-1 focus:ring-red-300 font-medium rounded-sm ml-4 mr-4 text-sm px-3 py-2 transition-all hover:scale-110 duration-300"
				><p>Month</p></button
			>
			<button
				class="focus:outline-none underline text-red-500 hover:bg-red-400 hover:text-white focus:ring-1 focus:ring-red-300 font-medium rounded-sm ml-4 mr-4 text-sm px-3 py-2 transition-all hover:scale-110 duration-300"
				><p>Calendar</p></button
			>
			<button
				class="focus:outline-none underline text-red-500 hover:bg-red-400 hover:text-white focus:ring-1 focus:ring-red-300 font-medium rounded-sm ml-4 mr-4 text-sm px-3 py-2 transition-all hover:scale-110 duration-300"
				><p>Statistics</p></button
			>
		</div>
	</div>

	<!-- Content -->
	<div class="w-4/5 h-full ml-auto flex flex-col">
		<div class="justify-end flex p-2">
			<div class="fixed">
				<img src={icon} alt="iconImage" width="150" />
			</div>
		</div>
		<div class="fixed bottom-16 right-16">
			<button
				on:click={() => addInfoDiv()}
				class="p-5 border rounded-full text-5xl w-24 h-24 text-center bg-red-400 text-white transition-all hover:scale-110 duration-300"
			>
				+
			</button>
		</div>

		<div class="pt-24 w-full flex">
			{#if addInfo}
				<div class="flex flex-col fixed border w-3/5 pt-96 justify-center">
					<div class="flex flex-col justify-center align-middle">
						<form action="">
							<label for="">
								Income
								<input type="text" bind:value={income} />
							</label>
							<label for="">
								Expense
								<input type="text" bind:value={expense} />
							</label>
							<label for="">
								category
								<input type="text" bind:value={category} />
							</label>
							<label for="">
								date
								<input type="text" bind:value={today} />
							</label>
							<p>{today}</p>
							<button on:click={() => addInfoOfDay(income, expense, today, category)}> ADD </button>
						</form>
					</div>
				</div>
			{/if}
		</div>
		<slot />
	</div>
</div>
