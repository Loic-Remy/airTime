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
        request.target = sessionStorage.getItem("userId");
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

        this._getData()
            .then(response => this.view.updateTable(response));

        document.getElementById("display").addEventListener('click', this._updateTable.bind(this));
        document.querySelector('#tableStamping').addEventListener('click', this._showOrHideDetails);
    }

    leaveView() {
        document.getElementById("display").removeEventListener('click', this._updateTable.bind(this));
        document.querySelector('#tableStamping').removeEventListener('click', this._showOrHideDetails);

    }
}