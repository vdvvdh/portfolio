class P3RProjectsMenu{
    private items = Array.from(document.querySelectorAll<HTMLAnchorElement>('.p3r-menu-item'));
    private currentIndex = 0;

    private txtTag = document.getElementById('display-tag');
    private txtTitle = document.getElementById('display-title');
    private txtDesc = document.getElementById('display-desc');
    private imgDisplay = document.getElementById('display-img') as HTMLImageElement | null;
    private linkCode = document.getElementById('link-code') as HTMLAnchorElement | null;

    private sfxUp = new Audio('audio/deck_ui_slider_up.wav');
    private sfxDown = new Audio('audio/deck_ui_slider_down.wav');
    private sfxSelect = new Audio('audio/deck_ui_select.wav');

    constructor(){
        if (!this.items.length) return;
        this.init();
    }

    private init() {
        this.updateActiveProject(0);

        this.items.forEach((item, index) => {
            //hover sound
            item.addEventListener('mouseenter', () =>{
                if (index !== this.currentIndex) {
                    this.play(index > this.currentIndex ? this.sfxDown : this.sfxUp);
                }
            });

            //vastzette
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.play(this.sfxSelect);
                this.updateActiveProject(index);
            });
        });
    }

    private updateActiveProject(index: number) {
        this.items[this.currentIndex]?.classList.remove('active');

        this.currentIndex = index;
        const activeItem = this.items[this.currentIndex];
        activeItem.classList.add('active');

        const { tag, title, desc, img, code } = activeItem.dataset;

        if (this.txtTag && tag) this.txtTag.textContent = tag;
        if (this.txtTitle && title) this.txtTitle.textContent = title;
        if (this.txtDesc && desc) this.txtDesc.textContent = desc;
        if (this.imgDisplay && img) this.imgDisplay.src = img;
        if (this.linkCode && code) this.linkCode.href = code;
    }

    private play(audio: HTMLAudioElement) {
        const clone = audio.cloneNode(true) as HTMLAudioElement;
        clone.volume = audio.volume || 1;
        clone.play().catch(() => {});
    }
}

document.addEventListener('DOMContentLoaded', () => new P3RProjectsMenu());