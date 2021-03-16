"use strict";

class ControllerConditions extends Controller
{
    constructor(hash)
    {
        super(hash);
        this.manager = new ConditionsManager(url_situation);
        this.view = new viewConditions('Conditions');
    }

    _currentYear() {
    	return new Date().getFullYear();
    }

    displayView() {
        this.view.buildPage();

        this.manager.getConditions(sessionStorage.getItem('userId'), this._currentYear())
            .then(response => this.view.updateTable(response));
    }

    leaveView() {

    }
}