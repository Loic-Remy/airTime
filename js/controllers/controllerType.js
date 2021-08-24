"use strict";

class ControllerType extends Controller 
{
    constructor(hash)
    {
        super(hash);

        this.manager = new IntervalManager(url_type);
        this.view = new ViewType('Saisie');
    }

    _filterCurrentDay(data) {
        return data.filter((element => {
            const currentDay = document.forms.typeForm.date.value;
            return element.begin.substring(0, 10) === currentDay;
        }));
 
    }

    _stamp(event) {
        event.preventDefault();

        let interval = new Interval();

        interval.fill(document.forms.typeForm);
        this.manager.sendInterval(interval)
            .then((response) => {
                if (response)
                    return this.manager.getIntervals(interval)
            })
            .then(response => this._filterCurrentDay(response))
            .then(response => this.view.updateTable(response)); 

        document.forms.typeForm.remark.value = "";
        document.forms.typeForm.begin.focus();
    }

    _updateStampingTable() {
        let interval = new Interval();
        interval.fill(document.forms.typeForm);
        
        this.manager.getIntervals(interval)
            .then(response => this._filterCurrentDay(response))
            .then(response => this.view.updateTable(response));
    }

    _updateTypeOptions(event) {

        const form = document.forms.typeForm;

        if (event.target.value === 'work') {
            form.type.options[0].setAttribute('selected', 'true');
            form.type.options[0].classList.remove('g-hidden');
            form.type.options[1].removeAttribute('selected');

            form.type.classList.add('g-hidden');
            document.querySelector('#labelType').classList.add('g-hidden');
            form.begin.classList.remove('g-hidden');
            document.querySelector('#labelBegin').classList.remove('g-hidden');
            form.end.classList.remove('g-hidden');
            document.querySelector('#labelEnd').classList.remove('g-hidden');
        } else if (event.target.value === 'driving') {
            form.type.options[0].removeAttribute('selected');
            form.type.options[0].classList.add('g-hidden');
            form.type.options[1].setAttribute('selected', 'true');

            form.duration.classList.remove('g-hidden');
            document.querySelector('#labelDuration').classList.remove('g-hidden');

            form.begin.classList.add('g-hidden');
            document.querySelector('#labelBegin').classList.add('g-hidden');

            form.end.classList.add('g-hidden');
            document.querySelector('#labelEnd').classList.add('g-hidden');

        }
        else 
        {
            form.type.options[0].removeAttribute('selected');
            form.type.options[0].classList.add('g-hidden');
            form.type.options[1].setAttribute('selected', 'true');

            form.type.classList.remove('g-hidden');
            document.querySelector('#labelType').classList.remove('g-hidden');

            form.begin.classList.add('g-hidden');
            document.querySelector('#labelBegin').classList.add('g-hidden');
            
            form.duration.classList.add('g-hidden');
            document.querySelector('#labelDuration').classList.add('g-hidden');

            form.end.classList.add('g-hidden');
            document.querySelector('#labelEnd').classList.add('g-hidden');
        }
    }

    _deleteInterval(event) {
        if(event.target.classList.contains('g-btnDelete') === false) {
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

        document.forms.typeForm.date.addEventListener('blur', this._updateStampingTable.bind(this));

        document.forms.typeForm.reason.addEventListener('change', this._updateTypeOptions.bind(this));

        document.addEventListener('click', this._deleteInterval.bind(this));    
    }

    leaveView() {
        document.querySelector('#btnSubmit').removeEventListener('click', this._stamp.bind(this));
        document.forms.typeForm.date.removeEventListener('blur', this._updateStampingTable.bind(this));
        document.forms.typeForm.reason.removeEventListener('change', this._updateTypeOptions.bind(this));
        document.removeEventListener('click', this._deleteInterval.bind(this));    
    }
}