<script>
	import { onMount } from 'svelte';
	export let data;
	let result;
	let moneyDayInfo = '';

	async function getMoneyDayInfo(day) {
		const response = await fetch('/api/getDayInfo', {
			method: 'POST',
			body: JSON.stringify({ day }),
			headers: {
				'content-type': 'application/json'
			}
		});

		result = await response.json();
		moneyDayInfo = result;
	}

	let today = '';

	onMount(() => {
		updateDate();
		const intervalId = setInterval(updateDate, 1000); // Update every second

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
</script>

<h1 class = "text-4xl">This is calendar</h1>
<p>Today is: {today}</p>
{#each data.data as moneyDayInfo}
	<button on:click={() => getMoneyDayInfo(moneyDayInfo)}>
		{moneyDayInfo}
	</button>
{/each}
{#if moneyDayInfo}
	{#each result as result}
		<p>{result.income}</p>
		<p>{result.expense}</p>
	{/each}
{/if}
