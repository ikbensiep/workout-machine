<script>
    import { afterUpdate, onMount } from 'svelte';

    export let speechText = '';

    let synth;
    let voices = [];
    let voice;
    let voiceSelect;
    let pitch = 1;
    let rate = .8;

    export const sayText = () => {
        console.log('saytext:', speechText);
        let utterThis = new SpeechSynthesisUtterance(speechText);
        
        utterThis.pitch = pitch;
        utterThis.rate = rate;
        utterThis.voice = voice;
        
        synth.speak(utterThis);

    }

    onMount( async () => {
        console.log('mount');
        synth = window.speechSynthesis;
        voices = await getVoices();
    });

    afterUpdate(() => {
        window.speechSynthesis.cancel();
        sayText();
    });

    const getVoices = () => {
        return new Promise((resolve) => {
            let voices = window.speechSynthesis.getVoices().filter(voice => voice.lang.includes(navigator.language));
            if (voices.length) {
                resolve(voices)
                return
            }
            speechSynthesis.onvoiceschanged = () => {
                voices = window.speechSynthesis.getVoices().filter(voice => voice.lang.includes(navigator.language));
                resolve(voices)
            }
        })
    }

    
    const handleVoiceChange = (event) => {
        console.log('handleChange')
        voice = voices[event.target.selectedIndex];
        console.log(voices);
    }

    window.speechSynthesis.onvoiceschanged = handleVoiceChange;

</script>

<select bind:this={voiceSelect} on:blur={ handleVoiceChange }>
    <option data-name="Henk">Henk</option>
    {#each voices as voice}
    <option data-name={voice.name} data-lang={voice.lang}>{voice.name} ({voice.lang})</option>
    {/each}
</select>