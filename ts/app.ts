class P3RMenu{
    private items = Array.from(document.querySelectorAll<HTMLAnchorElement>('.p3r-menu-item'));
    private btn = document.getElementById('p3r-volume-toggle') as HTMLButtonElement | null;
    private slider = document.getElementById('p3r-volume-slider') as HTMLInputElement | null;
    private icon = this.btn?.querySelector('.volume-icon');

    private currentIndex = 0;
    private isMuted = false;
    private currentVolume = 0.25;

    private sfxUp = new Audio('audio/deck_ui_slider_up.wav');
    private sfxDown = new Audio('audio/deck_ui_slider_down.wav');
    private sfxSelect = new Audio('audio/deck_ui_select.wav');
    private bgMusic = new Audio('audio/bg-music.mp3');

    constructor() {
        if (!this.items.length) return;

        this.bgMusic.loop =true;      
        this.bgMusic.volume =this.currentVolume;

        this.init();
    }

    private init() {
        const activeIndex = this.items.findIndex(item => item.classList.contains('active'));
        if (activeIndex !== -1) this.currentIndex = activeIndex;

        this.btn?.addEventListener('click', () => this.toggleMute());
        this.slider?.addEventListener('input', (e) => this.handleVolume(e));

        this.items.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                this.startBGM();
                if (index !== this.currentIndex) {
                    this.play(index > this.currentIndex ? this.sfxDown : this.sfxUp);
                    this.focusItem(index);
                }
            });
            
            item.addEventListener('click', () => {
                this.startBGM();
                this.play(this.sfxSelect);
            });
            
            item.addEventListener('keydown', (e) => {
                this.startBGM();
                this.handleKeys(e, index);
            });
        });

        document.addEventListener('click', () => this.startBGM(), { once: true });
    }

    private startBGM(){
        if (!this.isMuted && this.bgMusic.paused) {
            this.bgMusic.play().catch(() => {});
        }
    }

    private handleVolume(e: Event) {
        const value = parseFloat((e.target as HTMLInputElement).value) / 100;
        
        this.bgMusic.volume = value;
        this.currentVolume = value;
        this.isMuted = value === 0;
        
        this.updateUI();
    }

    private toggleMute() {
        this.isMuted = !this.isMuted;
        
        this.bgMusic.volume = this.isMuted ? 0 :this.currentVolume;
        if (this.slider) this.slider.value = (this.bgMusic.volume * 100).toString();
        
        this.updateUI();
        if (!this.isMuted) this.startBGM();
    }

    private updateUI() {
        this.btn?.classList.toggle('muted', this.isMuted);
        if (this.icon) this.icon.textContent = this.isMuted ? '🔇' : '🔊';
    }

    private play(audio: HTMLAudioElement) {
        audio.currentTime = 0;
        audio.play().catch(() =>{});
    }

    private focusItem(index: number) {
        this.items[this.currentIndex].classList.remove('active');
        this.currentIndex = index;
        this.items[this.currentIndex].classList.add('active');
    }

    private handleKeys(e: KeyboardEvent, index: number) {
        if (e.key !== 'ArrowDown' && e.key !=='ArrowUp' && e.key !== 'Enter' && e.key !== ' ') return;
        
        if (e.key === 'ArrowDown' || e.key ==='ArrowUp') {
            e.preventDefault();
            let nextIndex = e.key === 'ArrowDown' ? index +1 : index -1;
            
            if (nextIndex >= this.items.length) nextIndex = 0;
            if (nextIndex < 0) nextIndex = this.items.length - 1;
            
            this.play(e.key === 'ArrowDown' ? this.sfxDown : this.sfxUp);
            this.focusItem(nextIndex);
            this.items[nextIndex].focus();
        }else{
            this.play(this.sfxSelect);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new P3RMenu());