"use strict";

class ControllerSituation extends Controller
{
    constructor(hash)
    {
        super(hash);

        this.manager = new SituationManager(url_situation);
        this.view = new ViewSituation('Situation');
    }

    handleClick(event) {
            event.preventDefault();	

            this.manager.getSituation(localStorage.getItem('userId'), this.yearOfLastDay(), '1.1', this.lastDay().unixToSimple())
                .then(response => this.view.updateTable(response));
    }

    lastDay() {
    		return document.querySelector('#date').value;
    }

    yearOfLastDay() {
    		return this.lastDay().slice(0,4);
	    }

    displayView()
    {
        this.view.buildPage();
        
        
        this.manager.getSituation(localStorage.getItem('userId'), this.yearOfLastDay(), '1.1', this.lastDay().unixToSimple())
            .then(response => this.view.updateTable(response));
//            .then(response => console.log(response));
        
        document.querySelector('#displaySituation').addEventListener('click', (e) => this.handleClick(e));
    }

    leaveView() {
        document.querySelector('#displaySituation').removeEventListener('click', (e) => this.handleClick(e));
    }


}