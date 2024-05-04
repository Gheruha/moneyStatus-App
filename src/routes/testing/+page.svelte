<script>
	export let data;
</script>

{#each data.money as moneyData}
	<p>{moneyData.income}</p>
{/each}
