<script>
    import { afterUpdate, onMount } from 'svelte';

    export let speechText = '';

    let synth;
    let voices = [];
    let voice;
    let voiceSelect;
    let pitch = 1;
    let rate = 1.1;

    let utterThis = new SpeechSynthesisUtterance();
    
    export const sayText = () => {
        console.log('saytext:', speechText);
        utterThis = new SpeechSynthesisUtterance(speechText)
        synth.speak(utterThis);
        
    }
    
    onMount( async () => {
        console.log('mount');
        synth = window.speechSynthesis;
        voices = await getVoices();
        utterThis.pitch = pitch;
        utterThis.rate = rate;
        utterThis.voice = voice;
        window.speechSynthesis.onvoiceschanged = handleVoiceChange;
    });

    afterUpdate(() => {
        window.speechSynthesis.cancel();
        sayText();
    });

    const getVoices = () => {
        return new Promise((resolve) => {
            let voices = window.speechSynthesis.getVoices();

            if (voices.length) {

                // it'll have to do for now, Firefox has a LOTTT of (generated voices)
                // maybe filter using something like this: 
                // filterLanguages = [...new Set(voices.map(item => item.lang.split('-')[0]))];
                if (voices.length > 100) {
                    voices = window.speechSynthesis.getVoices().filter(voice => voice.lang.includes(navigator.language));
                }

                resolve(voices);
                return;
            }

            speechSynthesis.onvoiceschanged = () => {
                voices = window.speechSynthesis.getVoices();
                resolve(voices)
            }
        })
    }

    
    const handleVoiceChange = (event) => {
        
        voice = voices[event.target.selectedIndex];
        console.log(voice);
    }


</script>

<select bind:this={voiceSelect} on:blur={ handleVoiceChange }>
    {#each voices as voice}
    <option data-name={voice.name} data-lang={voice.lang}>{voice.name} [{voice.lang}]</option>
    {/each}
</select>