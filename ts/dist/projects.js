class P3RProjectsMenu {
    constructor() {
        this.items = Array.from(document.querySelectorAll('.p3r-menu-item'));
        this.currentIndex = 0;
        this.txtTag = document.getElementById('display-tag');
        this.txtTitle = document.getElementById('display-title');
        this.txtDesc = document.getElementById('display-desc');
        this.imgDisplay = document.getElementById('display-img');
        this.linkCode = document.getElementById('link-code');
        this.sfxUp = new Audio('audio/deck_ui_slider_up.wav');
        this.sfxDown = new Audio('audio/deck_ui_slider_down.wav');
        this.sfxSelect = new Audio('audio/deck_ui_select.wav');
        if (!this.items.length)
            return;
        this.init();
    }
    init() {
        this.updateActiveProject(0);
        this.items.forEach((item, index) => {
            //hover sound
            item.addEventListener('mouseenter', () => {
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
    updateActiveProject(index) {
        if (this.items[this.currentIndex]) {
            this.items[this.currentIndex].classList.remove('active');
        }
        this.currentIndex = index;
        const activeItem = this.items[this.currentIndex];
        activeItem.classList.add('active');
        const { tag, title, desc, img, code, demo } = activeItem.dataset;
        if (this.txtTag && tag)
            this.txtTag.textContent = tag;
        if (this.txtTitle && title)
            this.txtTitle.textContent = title;
        if (this.txtDesc && desc)
            this.txtDesc.textContent = desc;
        if (this.imgDisplay && img)
            this.imgDisplay.src = img;
        if (this.linkCode && code)
            this.linkCode.href = code;
    }
    play(audio) {
        audio.currentTime = 0;
        audio.play().catch(() => { });
    }
}
document.addEventListener('DOMContentLoaded', () => new P3RProjectsMenu());
