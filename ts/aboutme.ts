class P3RAboutMe {
    private buttons = Array.from(document.querySelectorAll<HTMLAnchorElement>('.p3r-back-btn, .btn'));
    private sfxSelect = new Audio('audio/deck_ui_select.wav');

    constructor() {
        this.init();
    }

    private init() {
        this.buttons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                this.play(this.sfxSelect);
                
                const href = btn.getAttribute('href');
                setTimeout(() => {
                    if (href && href !== '#') {
                        window.location.href = href;
                    }
                }, 180);
            });
        });
    }

    private play(audio: HTMLAudioElement) {
        audio.currentTime = 0;
        audio.play().catch((err) => console.log("Audio play blocked:", err));
    }
}

document.addEventListener('DOMContentLoaded', () => new P3RAboutMe());