"use strict";

class AppStatus
{
    constructor(msg, strongMsg) {
        this.strongMsg = strongMsg;
        this.msg = msg;
    }

    durationInMS = 5000;
    statusBar = document.querySelector("#statusBar");
    insertPoint = document.querySelector('.msgBox');

    _printAppStatus() {
        const strong = this.strongMsg === undefined ? "" : `<strong>${this.strongMsg}</strong>`;
        const msg = this.msg; 
        
        this.insertPoint.innerHTML = strong + msg;
        this.statusBar.classList.remove("g-hidden");

        console.debug(this.statusBar);

        setTimeout(this._hideStatusBar.bind(this), this.durationInMS);
    }

    _hideStatusBar() {
        const bar = this.statusBar;

        bar.classList.remove(".success", ".warning", ".failure");
        bar.classList.add("g-hidden");
    }

    printAsSuccess() {
        this.statusBar.classList.add(".success");
        this._printAppStatus();
    }

    printAsWarning() {
        this.statusBar.classList.add(".warning");
        this._printAppStatus();
    }

    printAsFailure() {
        this.statusBar.classList.add(".failure");
        this._printAppStatus();
    }
}