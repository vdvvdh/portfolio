class P3RContact {
    constructor() {
        this.backBtn = document.querySelector('.p3r-back-btn');
        this.submitBtn = document.querySelector('.contact-p3r-btn');
        this.sfxSelect = new Audio('audio/deck_ui_select.wav');
        this.init();
    }
    init() {
        var _a, _b;
        (_a = this.backBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.play(this.sfxSelect));
        (_b = this.submitBtn) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            this.play(this.sfxSelect);
        });
    }
    play(audio) {
        audio.currentTime = 0;
        audio.play().catch((err) => console.log("Audio play prevented:", err));
    }
}
document.addEventListener('DOMContentLoaded', () => new P3RContact());
