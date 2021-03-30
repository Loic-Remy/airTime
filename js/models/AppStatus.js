"use strict";

class AppStatus
{
    constructor(msg, strongMsg) {
        this.strongMsg = strongMsg;
        this.msg = msg;
    }

    durationInMS = 5000;
    statusBar = document.querySelector(".statusBar");
    insertPoint = document.querySelector('.statusBar__msgBox');

    _printAppStatus() {
        const strong = this.strongMsg === undefined ? "" : `<strong>${this.strongMsg}</strong>`;
        const msg = this.msg; 
        
        this.insertPoint.innerHTML = strong + msg;
        this.statusBar.classList.remove("hidden");

        setTimeout(this._hideStatusBar.bind(this), this.durationInMS);
    }

    _hideStatusBar() {
        const bar = this.statusBar;

        bar.classList.remove("statusBar--success", "statusBar--warning", "statusBar--failure");
        bar.classList.add("hidden");
    }

    printAsSuccess() {
        this.statusBar.classList.add("statusBar--success");
        this._printAppStatus();
    }

    printAsWarning() {
        this.statusBar.classList.add("statusBar--warning");
        this._printAppStatus();
    }

    printAsFailure() {
        this.statusBar.classList.add("statusBar--failure");
        this._printAppStatus();
    }
}