<script>
    import { onMount, onDestroy, afterUpdate } from 'svelte';
    import Announcer from './Announcer.svelte'

    export let workout;

    // do we still need separate vars?
    let name;
    let type;
    let level = 1;
    let desc;
    let coach;
    let collection;

    let newRepName;
    let newRepWork = 10;
    let newRepRest = 10;

    let newRepNameInput;
    let interval = undefined;

    let currentRep = 0;
    let currentSeconds = 0;
    let running = false;
    let workoutForm;
    $: speechText = '';

    $: totalDuration = 0;
    $: totalSeconds = 0;
    $: remainingSeconds = 0;

    const insertRep = () => {
        workout.reps.push( {'name': newRepName, 'work': newRepWork, 'rest': newRepRest});
        
        workout = workout;
            
        newRepNameInput.focus();
        updateTotalTime();
    }

    const deleteRep = (event) => {
        let index = parseInt(event.target.parentNode.dataset.rep);
        // const currentReps = reps;
        let reps = workout.reps;
        if (index > -1) {
            reps.splice(index, 1);
        }
        
        workout.reps = reps;
        updateTotalTime();

    }

    const saveWorkout = async () => {
        
        // one hot mess..
        // do not 

        let newWorkout = workout;
        

        let data = await localStorage.getItem('my-workouts');
        let myworkouts = JSON.parse(data) || [];
                
        if(workout.slug === 'new') {

            console.log('adding new workout');
                newWorkout.slug = newWorkout.name.replace(/ /g, '-').toLowerCase().trim();
                myworkouts = [...myworkouts, newWorkout];
                    
                
            } else {

                console.log('updating workout')
                let updateWorkout = myworkouts.findIndex( item => item.slug == newWorkout.slug);
                myworkouts[updateWorkout] = newWorkout;
 
        }
        
        localStorage.setItem('my-workouts', JSON.stringify(myworkouts));
    }


    const updateTotalTime = () => {
        let seconds = workout.reps.reduce((total, rep) => {
            return total + (rep.work + rep.rest)
        }, 0);

        remainingSeconds = seconds;
        totalDuration = Math.floor(seconds / 60) + ':' + ( seconds % 60 > 9 ? seconds % 60 : '0' + seconds % 60 );
        
    }

    const startWorkout = () => {
        
        totalSeconds = workout.reps.reduce((total, rep) => {
            return total + (rep.work + rep.rest)
        }, 0);
        
        interval = setInterval(()=>{
            if(currentRep < workout.reps.length) {
                
                if( workout.reps[currentRep].work ) {
                    currentSeconds = workout.reps[currentRep].work--;

                } else if ( workout.reps[currentRep].rest ) {
                    currentSeconds = workout.reps[currentRep].rest--;
                } else { 
                    currentRep++;
                }
                updateTotalTime()

            } else { 
                console.info('DONE!')
                console.warn('TODO: add to log in localstorage')
                cancelWorkout();
            }


        }, 1000);

        let inputs = workoutForm.querySelectorAll('input, textarea');
        Array.from(inputs).map( input => { input.setAttribute('disabled', true)});
        speechText = 'LETS GO!'
        
    }

    const cancelWorkout = () => {
        clearInterval(interval);
        interval = undefined;
        
        let inputs = workoutForm.querySelectorAll('input, textarea');
        Array.from(inputs).map( input => { input.removeAttribute('disabled')});
        speechText = 'pause';
        window.speechSynthesis.cancel();
    }

    onMount(() => {
        workout.warmup ? workout.reps = [...workout.warmup, workout.reps] : null;
        
        updateTotalTime();
        
        
    })

    onDestroy(() => {
        clearInterval(interval);
    });

</script>

<style>
    fieldset {
        display: flex;
        flex-direction: column;
        gap: 1em;
        margin: 1rem;
        padding: 1ex;
        border: none;
        background: #efefef;
        border-radius: .75ex;
        padding: 1rem;
    }

    fieldset div {
        display: flex;
        flex-direction: row ;
        justify-content: space-between;
        padding: 1rem 0;
        position: relative;
    }

    fieldset label {
        display: grid;
        grid-template-rows: 2rem 1fr;
        align-items: center;
    }

    .reps div {
        padding: .75ex 1ex;
        border-radius: .5ex;
        position: relative;
        background: 1.5s .25s cubic-bezier(0.46, 0.18, 0.71, 0.93);
    }
    
    
    .reps.playing .active {
        background: #B0BEC5;
    }
    
    .reps .timer-indicator {
        position: absolute;
        height: 2em;
        width: 2em;
        line-height: 2em;
        opacity: 0;
        transform: translateX(-34em);
        transition: all .75s 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .reps .timer-indicator::after {
        content: '➡';
        font-size: 2em;
        top: 0;
        color: #455A64;
    }

    .reps.playing .active .timer-indicator {
        opacity: 1;
        transform: translateX(-2em);
    }

    .rep input {
        font-size: 1.5em;
        max-width: 4em;
        color: #BDBDBD;
        background: transparent;
        border: none;
    }

    .playing .active input {
        color: white;
    }

    fieldset label span {font-size: .75rem}

    button > * {
        pointer-events: none;
    }


</style>

<form on:submit|preventDefault={ saveWorkout } bind:this={ workoutForm }>
    <fieldset>
        <legend>Workout details</legend>
        <label for="">
            <Announcer {speechText}/>
        </label>
        <label>
            <span>Name</span>
            <input type="text" bind:value={workout.name} />
        </label>
        <div>
            <label>
                <span>Type</span>
                <input type="text" bind:value={workout.type} />
            </label>
            <label>
                <span>Level</span>
                <input type="number" bind:value={workout.level} />
            </label>
            <label>
                <span>Collection</span>
                <input type="text" bind:value={workout.collection} />
            </label>
        </div>
        <label>
            <span>Description</span>
            <textarea type="text" bind:value={workout.desc} ></textarea>
        </label>
        <label>
            <span>Coach says</span>
            <input type="text" bind:value={workout.coach} placeholder="👮 Smell that? You smell that? Calories, son. I love the smell of burning calories in the mornin!"/>
        </label>
    </fieldset>

    <fieldset class="reps  {interval ? 'playing': 'paused'}">
        <legend>Reps (total duration: {totalDuration ? totalDuration : `0:00`})</legend>
        <div>
            <progress value={remainingSeconds} max={totalSeconds}></progress>
        </div>
        <div class="rep">
            <span>activity</span>
            <span>workout time</span>
            <span>rest time</span>
            <span></span>
        </div>
        
        {#each workout.reps as rep, i}
            <div class="rep {currentRep == i ? 'active' : ``}" data-rep={i} >
                <span class="timer-indicator"></span>
                <label>
                    <input type="text" placeholder="activity name" bind:value={ rep.name } >
                </label>
                <label>
                    <input type="number" placeholder="workout time" bind:value={ rep.work } on:change={ updateTotalTime } min="5" />
                </label>
                <label>
                    <input type="number" placeholder="rest time" bind:value={ rep.rest } on:change={ updateTotalTime } min="5" />
                </label>
                <button type="button" on:click={ deleteRep }><span aria-hidden="true">&times;</span> <strong>del</strong></button>
            </div>
            
        {/each}

        <div class="rep">
            <label>
                <input type="text" placeholder="activity" bind:value={ newRepName } bind:this={ newRepNameInput } >
            </label>
            <label>
                <input type="number" placeholder="workout time" bind:value={ newRepWork } min="5"  />
            </label>
            <label>
                <input type="number" placeholder="rest time" bind:value={ newRepRest } min="5"  />
            </label>
            <button type="button" on:click={ insertRep }>+ add</button>
        </div>
            
    </fieldset>

    <fieldset>
        <div>
            <button type="button" on:click={ startWorkout } disabled={interval}>start</button>
            <button type="button" on:click={ cancelWorkout } disabled={!interval}>pause</button>
            <button type="submit">save</button>
        </div>
    </fieldset>
</form>

