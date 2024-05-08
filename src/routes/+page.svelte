<script>
	// Components and functions from other files
	import { fade } from 'svelte/transition';
	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { deleteData } from '$lib/components/globalFunctions.js';
	import ChangeMonth from '../lib/components/changeMonth.svelte';

	// Data from server
	export let data;
	export let total_data;
	export let the_date;

	// Local
	let money_data = false;
	let money_id;

	function editTransaction(id) {
		money_id = id;
		money_data = !money_data;
	}
</script>
