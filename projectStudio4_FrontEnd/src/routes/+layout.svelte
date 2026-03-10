<script>
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$lib/NavBar.svelte';
	// import Logo from '$lib/Logo.svelte';
	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<NavBar loggedInUser={data.loggedInUser}/>

	<main>
		{@render children?.()}
	</main>
</div>

