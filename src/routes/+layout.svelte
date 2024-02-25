<script>
	import '../app.css';
	import icon from '$lib/images/moneyStatus.png';
</script>

<!-- Main Div -->
<div class="w-full h-full flex">
	<!-- Menu -->
	<div class="w-1/5 h-full fixed bg-gray-50 flex flex-col">
		<div class="w-full border border-red-500">
			<button>Daily</button>
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
