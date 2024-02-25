<script>
	import '../app.css';
	import icon from '$lib/images/moneyStatus.png';
</script>

<!-- Main Div -->
<div class="w-full h-full flex">
	<!-- Menu -->
	<div class="w-1/5 h-full fixed bg-gray-50 flex flex-col justify-start items-center">
		<div class="w-full flex flex-col space-y-2 mt-6">
			<button
				class="focus:outline-none underline text-red-500 hover:bg-red-400 hover:text-white focus:ring-1 focus:ring-red-300 font-medium rounded-sm ml-4 mr-4 text-sm px-3 py-2"
				><p>Daily</p></button
			>
			<button
				class="focus:outline-none underline text-red-500 hover:bg-red-400 hover:text-white focus:ring-1 focus:ring-red-300 font-medium rounded-sm ml-4 mr-4 text-sm px-3 py-2"
				><p>Month</p></button
			>
			<button
				class="focus:outline-none underline text-red-500 hover:bg-red-400 hover:text-white focus:ring-1 focus:ring-red-300 font-medium rounded-sm ml-4 mr-4 text-sm px-3 py-2"
				><p>Calendar</p></button
			>
			<button
				class="focus:outline-none underline text-red-500 hover:bg-red-400 hover:text-white focus:ring-1 focus:ring-red-300 font-medium rounded-sm ml-4 mr-4 text-sm px-3 py-2"
				><p>Statistics</p></button
			>
		</div>
	</div>

	<!-- Content -->
	<div class="w-4/5 h-full ml-auto flex flex-col">
		<div class="justify-end flex p-2">
			<img src={icon} alt="iconImage" width="150" />
		</div>
	</div>

	<slot />
</div>
