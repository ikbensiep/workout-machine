<script>
    import { afterUpdate, onMount } from 'svelte';

    export let speechText = '';

    let synth;
    let voices = [];
    let voice;
    let voiceSelect;
    let pitch = 1;
    let rate = 1;

    export const sayText = () => {
        console.log('saytext')
        let utterThis = new SpeechSynthesisUtterance(speechText);
        
        utterThis.pitch = pitch;
        utterThis.rate = rate;
        utterThis.voice = voice;
        
        synth.speak(utterThis);

    }

    onMount( async () => {
        console.log('mount')
        synth = window.speechSynthesis;
        voices = window.speechSynthesis.getVoices();
        voice = voices[event.target.selectedIndex];
    });

    afterUpdate(() => {
        console.log('afterupdate')
        sayText();
    });

    const handleVoiceChange = (event) => {
        console.log('handleChange')
        voices = window.speechSynthesis.getVoices();
        voice = voices[event.target.selectedIndex];
    }

</script>

<select bind:this={voiceSelect} on:blur={ handleVoiceChange }>
    <option data-name="Henk"></option>
    {#each voices as voice}
    <option data-name={voice.name} data-lang={voice.lang}>{voice.name} ({voice.lang})</option>
    {/each}
</select>