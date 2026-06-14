var P3RResume = /** @class */ (function () {
    function P3RResume() {
        this.downloadBtn = document.getElementById('resume-downloadBtn');
        this.sfxSelect = new Audio('audio/deck_ui_select.wav');
        this.sfxHover = new Audio('audio/deck_ui_slider_up.wav');
        this.hasInteracted = false;
        if (!this.downloadBtn)
            return;
        this.init();
    }
    P3RResume.prototype.init = function () {
        var _this = this;
        document.addEventListener('click', function () {
            _this.hasInteracted = true;
        }, { once: true });
        this.downloadBtn.addEventListener('click', function (e) {
            e.preventDefault();
            _this.play(_this.sfxSelect);
        });
        this.downloadBtn.addEventListener('mouseenter', function () {
            if (_this.hasInteracted) {
                _this.play(_this.sfxHover);
            }
        });
    };
    P3RResume.prototype.play = function (audio) {
        var clone = audio.cloneNode(true);
        clone.volume = audio.volume || 1;
        clone.play().catch(function () { });
    };
    return P3RResume;
}());
document.addEventListener('DOMContentLoaded', function () { return new P3RResume(); });
