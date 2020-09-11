<style>
	* {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<aside>
{#each programmes as {level, name, type, desc}}
		<article data-workout={name}>
			<h3 data-level={level}>{name}</h3>
			<button type="button" on:click={ () => selectWorkout(name) }>{name}</button>
		</article>
{/each}
</aside>

{#if workout}
	<WorkoutDetails { workout } />
{/if}


<script>
	import { onMount } from 'svelte';
	import WorkoutDetails from '../components/WorkoutDetails.svelte'
	
	let programmes = [];
	$: workout = undefined;

	onMount( async ()=>{
		let res = await fetch('/data/workouts.json');
		let data = await res.json();
		makeList(data);
	});


	const makeList = (spul) => {
		
		let keys = Object.keys(spul);
		let temp = [];
		keys.map( key => {
			temp.push(...spul[key]);
		});
		
		programmes = temp;

		console.log(programmes)
	}
	

	const selectWorkout = (workoutName) => {
		workout = null;
		workout = programmes.find( programme => programme.name == workoutName );
		
	}

</script>
