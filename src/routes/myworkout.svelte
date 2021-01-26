<script>
    import { onMount } from 'svelte';
    export let workout; 
    let myworkouts; 

    onMount( async ()=>{
		console.log('mount')
		if(!workout) {
			console.log('no workout supplied, checking localStorage')
			myworkouts = localStorage.getItem('my-workouts');
			myworkouts = JSON.parse(myworkouts) || [];
			
			let myworkout;
			if( myworkout = myworkouts.find(workout => workout.slug == params.slug)) {
				workout = myworkout;
			}
		}
	});
</script>