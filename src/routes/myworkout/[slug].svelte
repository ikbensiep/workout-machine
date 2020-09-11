<script>
    import { onMount } from 'svelte';
    import WorkoutDetails from '../../components/WorkoutDetails.svelte';
    export let workout; 

    let myworkouts; 

    onMount( async ()=>{
		if(!workout) {
			console.log('no workout supplied, checking localStorage')
			myworkouts = await localStorage.getItem('my-workouts');
			myworkouts = JSON.parse(myworkouts) || [];
			
			let myworkout;
			if( myworkout = myworkouts.find(workout => workout.slug == document.location.pathname.split('/')[2])) {
				workout = myworkout;
			}
		}
	});
</script>

{#if workout}
<WorkoutDetails {workout} />
{/if}