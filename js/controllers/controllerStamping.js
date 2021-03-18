"use strict";

class ControllerStamping extends Controller
{
    constructor(hash)
    {
        super(hash);

        this.manager = new StampingManager(url_situation);
        this.view = new ViewStamping('Timbrages');
    }

    _updateTable(event) {
        event.preventDefault();
        
        this.manager.getStamping()
            .then(response => this.view.updateTable(response));
    }
    
    _showOrHideDetails(event)
	{
        if(event.target.nodeName != 'TD') {
            return;
        }

        let currentEl = event.target.parentElement.nextElementSibling;
                        
        while (currentEl.classList.contains('detailLine'))
        {
            if (currentEl.classList.contains('hidden'))
            {
                currentEl.classList.replace('hidden', 'shown');
            }
            else
            {
                currentEl.classList.replace('shown', 'hidden');
            }
            currentEl = currentEl.nextElementSibling;
        }
	}

    displayView()
    {
        this.view.buildPage();

        this.manager.getStamping()
            .then(response => this.view.updateTable(response));

        document.getElementById("display").addEventListener('click', this._updateTable.bind(this));
        document.querySelector('#tableStamping').addEventListener('click', this._showOrHideDetails);
    }

    leaveView() {
        document.getElementById("display").removeEventListener('click', this._updateTable.bind(this));
        document.querySelector('#tableStamping').removeEventListener('click', this._showOrHideDetails);

    }
}