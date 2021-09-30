"use strict";

class ControllerStamping extends Controller
{
    constructor(hash)
    {
        super(hash);

        this.manager = new StampingManager(url_situation);
        this.view = new ViewStamping('Timbrages');
    }

    async _getData() {
        const stamping = await this.manager.getStamping();

        const request = new Interval();
        request.target = localStorage.getItem("userId");
        request.from = document.forms.formDate.firstDay.value;
        request.until = document.forms.formDate.lastDay.value;

        const intervalManager = new IntervalManager(url_stamping);
        const intervals = await intervalManager.getIntervals(request);

        return await {'stamping' : stamping,
                       'intervals' : intervals
                    };
    }

    _updateTable(event) {
        event.preventDefault();
        
        this._getData()
            .then(response => this.view.updateTable(response));
    }
    
    _showOrHideDetails(event)
	{
        if (event.target.nodeName != 'TD' ||
            event.target.parentElement.classList.contains('detailLine')) {
            return;
        }

        let currentEl = event.target.parentElement.nextElementSibling;

        while (currentEl.classList.contains('detailLine'))
        {
            currentEl.classList.toggle('g-hidden');
            currentEl = currentEl.nextElementSibling;
        }
	}

    _displayFilterWindow() {
        const insertPoint = document.querySelector('body');

        const dialog = document.createElement('dialog');
        dialog.setAttribute('open', 'true');
        dialog.innerHTML = '<p> Fenêtre</p>';
        

        insertPoint.append(dialog);
    }

    displayView()
    {
        this.view.buildPage();

        this._getData()
            .then(response => this.view.updateTable(response));

        console.log(document.querySelector('#tableStamping thead'));

        document.getElementById("display").addEventListener('click', this._updateTable.bind(this));
        document.querySelector('#tableStamping').addEventListener('click', this._showOrHideDetails);
        document.querySelector('#tableStamping thead').addEventListener('click', this._displayFilterWindow);
    }

    leaveView() {
        document.getElementById("display").removeEventListener('click', this._updateTable.bind(this));
        document.querySelector('#tableStamping').removeEventListener('click', this._showOrHideDetails);

    }
}