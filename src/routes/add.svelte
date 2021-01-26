<script>
    import { workout } from '../stores.js';
    let name;
    let type;
    let level = 1;
    let desc;
    let coach;
    let collection;
    let reps = [];
    let newRep = {name: "", work: undefined, rest: undefined};
    let newRepNameInput;

    const insertRep = () => {
        reps = [...reps, newRep];
        newRepNameInput.focus();
    }

    const saveWorkout = () => {
        let newWorkout = { name, type, desc, coach, level, reps }
        workout.set(newWorkout);
        console.log($workout);
    }
</script>

<style>
    fieldset {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    fieldset div,
    fieldset:last-of-type {
        display: flex;
        flex-direction: row ;
        justify-content: space-between;
        
    }

    fieldset label {
        display: grid;
        grid-template-rows: 2rem 1fr;
        align-items: center;
    }

    fieldset label span {font-size: .75rem}

    fieldset.reps label {
        grid-template: 2rem / 8rem 6rem;
    }

    div.rep:last-of-type {
        background: #efefef;
    }

</style>

<form on:submit|preventDefault={ saveWorkout }>
    <h1>Add a new workout</h1>
    <fieldset>
        <legend>Workout details</legend>
        <label>
            <span>Name</span>
            <input type="text" bind:value={name} />
        </label>
        <div>
            <label>
                <span>Type</span>
                <input type="text" bind:value={type} />
            </label>
            <label>
                <span>Level</span>
                <input type="number" bind:value={level} />
            </label>
            <label>
                <span>Collection</span>
                <input type="text" bind:value={collection} />
            </label>
        </div>
        <label>
            <span>Description</span>
            <textarea type="text" bind:value={desc} ></textarea>
        </label>
        <label>
            <span>Coach says</span>
            <input type="text" bind:value={coach} placeholder="👮 Smell that? You smell that? Calories, son. I love the smell of burning calories in the mornin!"/>
        </label>
    </fieldset>

    <fieldset class="reps">
        <legend>Reps</legend>
        
        {#each reps as rep, i}
            <div class="rep">
                <label>
                    <input type="text" placeholder="activity name" bind:value={reps[i].name}>
                </label>
                <label>
                    <input type="number" placeholder="workout time" value={ rep.work } />
                </label>
                <label>
                    <input type="number" placeholder="rest time" value={ rep.rest }/>
                </label>
                <button><span aria-hidden="true">&times;</span> <strong>delete</strong></button>
            </div>
        {/each}

        <div class="rep">
            <label>
                <span>Activity</span>
                <input type="text" placeholder="activity name" bind:value={ newRep.name } bind:this={newRepNameInput}>
            </label>
            <label>
                <span>workout time</span>
                <input type="number" placeholder="workout time" bind:value={ newRep.work } />
            </label>
            <label>
                <span>rest time</span>
                <input type="number" placeholder="rest time" bind:value={ newRep.rest }/>
            </label>
            <button type="button" on:click={ insertRep }>add</button>
        </div>
            
    </fieldset>

    <fieldset>
        <button type="reset">empty all</button>
        <button type="submit">save workout</button>
    </fieldset>
</form>

