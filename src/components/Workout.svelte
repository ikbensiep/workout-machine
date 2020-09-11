<script>
    import { onMount } from 'svelte';
    export let workout;

    onMount(()=>{
        
    })

</script>
<article>
    <h1>
        {workout.name}
    </h1>
    <p>
        {workout.desc}
    </p>

    {#each workout.reps as [name, work, rest]}
        <article>
            <h4>
            {name}
            </h4>
            <p>work: {work}, rest: {rest}</p>
        </article>
    {/each}
</article>