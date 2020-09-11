<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`workout.json`).then(r => r.json()).then( defaultworkouts => {
			return { defaultworkouts };
		});
	}
</script>

<script>
	import { onMount } from 'svelte';
	export let defaultworkouts;
	
	let myworkouts = []; 
	onMount( async () => {
		myworkouts = await localStorage.getItem('my-workouts');
		myworkouts = JSON.parse(myworkouts) || [];
	})
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Workouts</title>
</svelte:head>
<a href="workout/new">create a workout</a>

<h1>Standard workouts</h1>

<ul>
	{#each defaultworkouts as workout}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		{#if workout.slug !== 'new'}
		<li><a rel='prefetch' href='workout/{workout.slug}'>{workout.title}</a></li>
		{/if}
        
	{/each}
</ul>

<h1>My workouts</h1>
<ul>
{#await myworkouts}
	<li><h1>loading</h1></li>
{:then myworkouts}
	{#each myworkouts as workout}
		
		{#if workout.slug !== 'new'}
		<li><a href='myworkout/{workout.slug}'>{workout.name}</a></li>
		{/if}
        
	{/each}
{/await}
</ul>