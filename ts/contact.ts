class P3RContact{
    private backBtn = document.querySelector('.p3r-back-btn') as HTMLAnchorElement | null;
    private submitBtn = document.querySelector('.contact-p3r-btn') as HTMLButtonElement | null;
    private sfxSelect = new Audio('audio/deck_ui_select.wav');

    constructor(){
        this.init();
    }

    private init() {
        this.backBtn?.addEventListener('click', () => this.play(this.sfxSelect));

        this.submitBtn?.addEventListener('click', () =>{
            this.play(this.sfxSelect);
        });
    }

    private play(audio: HTMLAudioElement){
        audio.currentTime = 0;
        audio.play().catch((err) => console.log("Audio play prevented:", err));
    }
}

document.addEventListener('DOMContentLoaded', () =>new P3RContact());