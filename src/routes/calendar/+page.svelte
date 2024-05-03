<script>
	// local data
	let l = '<';
	let r = '>';
	let monthName = new Date().toLocaleString('default', {
		month: 'long',
		year: 'numeric'
	});
	let weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
</script>

<div class="w-4/5 h-full ml-auto flex flex-col pl-36 pr-36 pb-36 pt-36">
	<!-- Calendar -->
	<div class="border rounded-lg bg-slate-50 shadow-lg dark:bg-zinc-800 dark:border-zinc-600 pb-10">
		<div class="flex justify-between border-b p-10 dark:border-zinc-600">
			<button
				class="p-2 w-10 rounded-full bg-blue-500 transition-all hover:bg-blue-400 hover:scale-110 duration-300 text-white"
				>{l}</button
			>
			<h1 class="text-2xl">
				{monthName}
			</h1>
			<button
				class="p-2 w-10 rounded-full bg-blue-500 transition-all hover:bg-blue-400 hover:scale-110 duration-300 text-white"
				>{r}</button
			>
		</div>

		<!-- Weekdays-->
		<div
			class="weekdays flex flex-wrap justify-between pt-4 pb-4 text-xl text-blue-500 bg-slate-200 dark:bg-zinc-700"
		>
			{#each weekdays as weekday}
				<p>{weekday}</p>
			{/each}
		</div>

		<!-- Days -->
		<div class="days flex flex-wrap justify-between pt-8 text-xl">
			{#each Array(42) as _, i}
				<button
					class="h-20 border-b dark:border-zinc-700 transition-all hover:bg-slate-200 dark:hover:bg-zinc-600 duration-300"
					>{i + 1}</button
				>
			{/each}
		</div>
	</div>
</div>

<style>
	.days button {
		width: 13.6%;
	}

	.weekdays p {
		width: 13.6%;
	}
</style>
