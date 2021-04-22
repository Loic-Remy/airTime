"use strict";

class ControllerRequest extends Controller 
{
    constructor(hash)
    {
        super(hash);

        this.manager = new IntervalManager(url_type);
        this.view = new ViewRequest('Demandes');
    }

    _filterFromGivenDay(data, date) {
        return data.filter((element => {
            const dateLength = 10;
            const givenDay = date.toUnixFormat();

            return element.begin.substring(0, dateLength) >= givenDay;
        }));
 
    }

    _changeDateEnd(event) {
        const beginValue = document.querySelector('#inputDateBegin').value;
        const endElement = document.querySelector('#inputDateEnd');
   
        endElement.value = beginValue;
        endElement.min = beginValue;
    }

    _changeTypeEnd(event) {
        const midiOption = 0;
        const beginDate = document.querySelector('#inputDateBegin').value;
        const endDate = document.querySelector('#inputDateEnd').value;
        const beginType = document.querySelector('#typeBegin').selectedOptions;
        const endType = document.querySelector('#typeEnd');

        console.log(beginType[0]);
        console.log(endType[0]);

        if(beginDate === endDate && beginType[0].value === 'afternoon') {
            endType.options[midiOption].classList.add('g-hidden');
        } else {
            endType.options[midiOption].classList.remove('g-hidden');
        }

    }

    _stamp(event) {
        event.preventDefault();

        const request = new Request();
        request.fill(document.forms.requestForm);

        const intervals = request.splitIntervals();
        console.log(intervals);

        for(let i = 0; i < intervals.length; i++) {
            this.manager.sendInterval(intervals[i])
                .then((response) => {
                    if (response) {
                        const firstInt = intervals[0];
                        const today = new Date();

                        firstInt.from = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}T00:00:00Z`;
                        firstInt.until = `${today.getFullYear()}-12-31T00:00:00Z`;
                        
                        return this.manager.getIntervals(intervals[i])
                    }
                })
                .then(response => this._filterFromGivenDay(response, today()))
                .then(response => this.view.updateTable(response)); 
        }
        
        document.forms.requestForm.remark.value = "";
        document.forms.requestForm.dateBegin.focus();
    }

    _updateStampingTable() {
        const firstDay = 0;
        const request = new Request();
        request.fill(document.forms.requestForm);
        const intervals = request.splitIntervals();
        
        const firstInt = intervals[firstDay];

        firstInt.from = `${today().getFullYear()}-${today().getMonth() + 1}-${today().getDate()}T00:00:00Z`;
        firstInt.until = `${today().getFullYear()}-12-31T00:00:00Z`;
 

        this.manager.getIntervals(firstInt)
            .then(response => this._filterFromGivenDay(response, today()))
            .then(response => this.view.updateTable(response));
    }

    _deleteInterval(event) {
        if(event.target.classList.contains('btnDelete') === false) {
            return;
        }

        const idToDelete = event.target.parentElement.parentElement.firstChild.innerHTML;
        console.log(idToDelete);

        
        this.manager.deleteInterval(idToDelete);

        console.log('touché');
        event.stopPropagation();

        this._updateStampingTable();
    }

    displayView()
    {
        
        this.view.buildPage();

        this._updateStampingTable();

        document.querySelector('#btnSubmit').addEventListener('click', this._stamp.bind(this));
        document.querySelector('#inputDateBegin').addEventListener('blur', this._changeDateEnd.bind(this));
        document.querySelector('#typeEnd').addEventListener('focus', this._changeTypeEnd.bind(this));

        document.addEventListener('click', this._deleteInterval.bind(this));    
    }

    leaveView() {
        document.querySelector('#btnSubmit').removeEventListener('click', this._stamp.bind(this));
    }
}