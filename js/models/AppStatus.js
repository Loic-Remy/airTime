"use strict";

class AppStatus
{
    constructor(msg) {
        this.msg = msg;
    }

    statusBar = document.querySelector(".statusBar");

    insertPoint = document.querySelector('.statusBar__msgBox');

    _printAppStatus() {
        this.insertPoint.innerHTML = this.msg;
        this.statusBar.classList.remove("hidden");

        setInterval(this._hideStatusBar, 5000);
    }

    _hideStatusBar() {
        const bar = this.statusBar;
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