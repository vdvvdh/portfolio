class P3RAboutMe {
    constructor() {
        this.buttons = Array.from(document.querySelectorAll('.p3r-back-btn, .btn'));
        this.sfxSelect = new Audio('audio/deck_ui_select.wav');
        this.init();
    }
    init() {
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
    play(audio) {
        audio.currentTime = 0;
        audio.play().catch((err) => console.log("Audio play blocked:", err));
    }
}
document.addEventListener('DOMContentLoaded', () => new P3RAboutMe());
