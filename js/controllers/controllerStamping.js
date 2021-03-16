"use strict";

class ControllerStamping extends Controller
{
    constructor(hash)
    {
        super(hash);

        this.manager = new StampingManager(url_situation);
        this.view = new ViewStamping('Timbrages');
    }

    _handleClick(event) {
        event.preventDefault();
        
        this.manager.getStamping()
            .then(response => this.view.updateTable(response));
    }

    displayView()
    {
        this.view.buildPage();

        this.manager.getStamping()
            .then(response => this.view.updateTable(response));

        document.getElementById("display").addEventListener('click', (e) => this._handleClick(e));
    }

    leaveView() {
        document.getElementById("display").removeEventListener('click', (e) => this._handleClick(e));

    }
}