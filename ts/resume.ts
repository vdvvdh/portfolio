class P3RResume{
    private downloadBtn = document.getElementById('resume-downloadBtn') as HTMLButtonElement | null;
    private sfxSelect = new Audio('audio/deck_ui_select.wav');
    private sfxHover = new Audio('audio/deck_ui_slider_up.wav');
    private hasInteracted = false;

    constructor(){
        if (!this.downloadBtn) return;
        this.init();
    }

    private init() {
        document.addEventListener('click', () =>{
            this.hasInteracted = true;
        }, { once: true });

        this.downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.play(this.sfxSelect);
        });

        this.downloadBtn.addEventListener('mouseenter', () => {
            if (this.hasInteracted){
                this.play(this.sfxHover);
            }
        });
    }

    private play(audio: HTMLAudioElement) {
        const clone = audio.cloneNode(true) as HTMLAudioElement;
        clone.volume = audio.volume || 1;
        clone.play().catch(() =>{});
    }
}

document.addEventListener('DOMContentLoaded', () =>new P3RResume());
