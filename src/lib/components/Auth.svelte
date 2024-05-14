<script>
	import { supabase } from '$lib/database/supabaseClient.js';
	import loginPhoto from '$lib/images/login.png';

	let loading = false;
	let email;

	const handleLogin = async () => {
		try {
			loading = true;
			console.log(email);
			const { error } = await supabase.auth.signInWithOtp({ email });
			if (error) throw error;
			alert('✅ Check your email for the login link !');
		} catch (err) {
			alert('⚠️ ' + err);
		} finally {
			loading = false;
		}
	};
</script>

<div
	class="w-4/5 flex justify-between pr-36 pl-12 items-center rounded-lg shadow-lg bg-gradient-to-r from-blue-200 to-slate-50 dark:bg-gradient-to-r dark:from-slate-700 dark:to-zinc-800"
>
	<img src={loginPhoto} alt="photo" />
	<form on:submit|preventDefault={handleLogin}>
		<div class="pt-10">
			<h1 class="text-4xl font-semibold">Welcome !</h1>
			<p class="pt-2 dark:text-gray-400">Sign in via magic link with your email below.</p>
		</div>

		<div class="pt-10 w-96 flex flex-col text-left">
			<label for="email">Email: </label>
			<input
				type="email"
				class="bg-slate-100 text-zinc-800 p-2 border border-slate-700 dark:border-zinc-600 dark:text-slate-100 rounded-lg dark:bg-zinc-800"
				placeholder="ex. example@gmail.com"
				bind:value={email}
			/>
			<div class="pt-4 pb-10">
				<button
					class="p-2 w-full border rounded-lg border-blue-500 bg-blue-500 text-white hover:bg-blue-400 transition-all hover:scale-105 duration-300"
					>Log In
				</button>
			</div>
		</div>
	</form>
</div>
