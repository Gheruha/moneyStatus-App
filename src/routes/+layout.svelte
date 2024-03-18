<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { formatDay } from '$lib/components/formattingDay.js';
	import icon from '$lib/images/moneyStatus.png';

	let addInfo = false;
	let income, expense, category;
	let today = '';

	function addInfoDiv() {
		addInfo = !addInfo;
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

	async function addInfoOfDay(income, expense, today, category) {
		const data = JSON.stringify({ income, expense, today, category });
		const response = await fetch('api/writeDayInfo', {
			method: 'POST',
			body: data,
			headers: {
				'content-type': 'application/json'
			}
		});
		location.reload();
	}
</script>

<!-- Main Div -->
<div class="w-full h-full flex">
	<!-- Menu -->
	<div class="w-1/5 h-full fixed bg-gray-100 flex flex-col justify-start items-center">
		<div class="w-full flex flex-col space-y-2 mt-6 pt-8">
			<button
				class="focus:outline-none underline text-blue-500 hover:bg-blue-400 hover:text-white focus:ring-1 focus:ring-blue-300 font-medium rounded-sm ml-4 mr-4 text-sm px-3 py-2 transition-all hover:scale-110 duration-300"
				><p>Daily</p></button
			>
			<button
				class="focus:outline-none underline text-blue-500 hover:bg-blue-400 hover:text-white focus:ring-1 focus:ring-blue-300 font-medium rounded-sm ml-4 mr-4 text-sm px-3 py-2 transition-all hover:scale-110 duration-300"
				><p>Month</p></button
			>
			<button
				class="focus:outline-none underline text-blue-500 hover:bg-blue-400 hover:text-white focus:ring-1 focus:ring-blue-300 font-medium rounded-sm ml-4 mr-4 text-sm px-3 py-2 transition-all hover:scale-110 duration-300"
				><p>Calendar</p></button
			>
			<button
				class="focus:outline-none underline text-blue-500 hover:bg-blue-400 hover:text-white focus:ring-1 focus:ring-blue-300 font-medium rounded-sm ml-4 mr-4 text-sm px-3 py-2 transition-all hover:scale-110 duration-300"
				><p>Statistics</p></button
			>
		</div>
	</div>

	<!-- Content -->
	<div class="w-4/5 h-full ml-auto flex flex-col pl-36 pr-36 pb-36">
		<div class="fixed bottom-16 right-16">
			<button
				on:click={() => addInfoDiv()}
				class="p-5 border rounded-full text-5xl w-24 h-24 text-center bg-blue-400 text-white transition-all hover:scale-110 duration-300"
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
