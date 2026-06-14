class P3RResume {
    constructor() {
        this.downloadBtn = document.getElementById('resume-downloadBtn');
        this.sfxSelect = new Audio('audio/deck_ui_select.wav');
        this.sfxHover = new Audio('audio/deck_ui_slider_up.wav');
        this.hasInteracted = false;
        if (!this.downloadBtn)
            return;
        this.init();
    }
    init() {
        document.addEventListener('click', () => {
            this.hasInteracted = true;
        }, { once: true });
        this.downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.play(this.sfxSelect);
        });
        this.downloadBtn.addEventListener('mouseenter', () => {
            if (this.hasInteracted) {
                this.play(this.sfxHover);
            }
        });
    }
    play(audio) {
        const clone = audio.cloneNode(true);
        clone.volume = audio.volume || 1;
        clone.play().catch(() => { });
    }
}
document.addEventListener('DOMContentLoaded', () => new P3RResume());
