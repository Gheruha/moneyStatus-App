<script lang="ts">
	import { browser } from '$app/environment';

	let darkMode = false;

	function handleSwitchDarkMode() {
		darkMode = !darkMode;

		localStorage.setItem('theme', darkMode ? 'dark' : 'light');

		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			darkMode = true;
		} else {
			document.documentElement.classList.remove('dark');
			darkMode = false;
		}
	}
</script>

<input checked={darkMode} on:click={handleSwitchDarkMode} type="checkbox" id="theme-toggle" />
<label for="theme-toggle" />

<style lang="postcss">
	#theme-toggle {
		@apply invisible;
	}

	#theme-toggle + label {
		@apply h-6 w-6 absolute rounded-full left-32 duration-300 content-[''];
		/* opacity: 0; */
	}

	#theme-toggle + :hover {
		opacity: 100;
	}

	#theme-toggle:not(:checked) + label {
		@apply bg-amber-400;
	}

	#theme-toggle:checked + label {
		@apply bg-transparent;
		box-shadow: inset -4px -3px 1px 1px #ddd;
	}
</style>
