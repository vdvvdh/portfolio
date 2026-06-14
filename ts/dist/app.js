class P3RMenu {
    constructor() {
        var _a;
        this.items = Array.from(document.querySelectorAll('.p3r-menu-item'));
        this.btn = document.getElementById('p3r-volume-toggle');
        this.slider = document.getElementById('p3r-volume-slider');
        this.icon = (_a = this.btn) === null || _a === void 0 ? void 0 : _a.querySelector('.volume-icon');
        this.currentIndex = 0;
        this.isMuted = false;
        this.currentVolume = 0.25;
        this.sfxUp = new Audio('audio/deck_ui_slider_up.wav');
        this.sfxDown = new Audio('audio/deck_ui_slider_down.wav');
        this.sfxSelect = new Audio('audio/deck_ui_select.wav');
        this.bgMusic = new Audio('audio/bg-music.mp3');
        if (!this.items.length)
            return;
        this.bgMusic.loop = true;
        this.bgMusic.volume = this.currentVolume;
        this.init();
    }
    init() {
        var _a, _b;
        const activeIndex = this.items.findIndex(item => item.classList.contains('active'));
        if (activeIndex !== -1)
            this.currentIndex = activeIndex;
        (_a = this.btn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.toggleMute());
        (_b = this.slider) === null || _b === void 0 ? void 0 : _b.addEventListener('input', (e) => this.handleVolume(e));
        this.items.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                this.startBGM();
                if (index !== this.currentIndex) {
                    this.play(index > this.currentIndex ? this.sfxDown : this.sfxUp);
                    this.focusItem(index);
                }
            });
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const href = item.getAttribute('href');
                this.startBGM();
                this.play(this.sfxSelect);
                this.focusItem(index);
                setTimeout(() => {
                    if (href && href !== '#') {
                        window.location.href = href;
                    }
                }, 180);
            });
        });
        document.addEventListener('click', () => this.startBGM(), { once: true });
    }
    startBGM() {
        if (!this.isMuted && this.bgMusic.paused) {
            this.bgMusic.play().catch(() => { });
        }
    }
    handleVolume(e) {
        const value = parseFloat(e.target.value) / 100;
        this.bgMusic.volume = value;
        this.currentVolume = value;
        this.isMuted = value === 0;
        this.updateUI();
    }
    toggleMute() {
        this.isMuted = !this.isMuted;
        this.bgMusic.volume = this.isMuted ? 0 : this.currentVolume;
        if (this.slider)
            this.slider.value = (this.bgMusic.volume * 100).toString();
        this.updateUI();
        if (!this.isMuted)
            this.startBGM();
    }
    updateUI() {
        var _a;
        (_a = this.btn) === null || _a === void 0 ? void 0 : _a.classList.toggle('muted', this.isMuted);
        if (this.icon)
            this.icon.textContent = this.isMuted ? '🔇' : '🔊';
    }
    play(audio) {
        audio.currentTime = 0;
        audio.play().catch(() => { });
    }
    focusItem(index) {
        this.items[this.currentIndex].classList.remove('active');
        this.currentIndex = index;
        this.items[this.currentIndex].classList.add('active');
    }
}
document.addEventListener('DOMContentLoaded', () => new P3RMenu());
