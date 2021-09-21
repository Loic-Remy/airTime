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
            this._changeMode('modeWork');
            form.type.options[0].setAttribute('selected', 'true');
            form.type.options[1].removeAttribute('selected');

        } else if (event.target.value === 'driving') {
            this._changeMode('modeDriving');
            form.type.options[0].classList.add('g-hidden');
        }
        else 
        {
            this._changeMode('modeAbsence');
            form.type.options[0].removeAttribute('selected');
            form.type.options[0].classList.add('g-hidden');
            form.type.options[1].setAttribute('selected', 'true');
        }
    }

    _changeMode(newMode) {
        console.log('switch to ' + newMode);
        const formElements = document.forms.typeForm.children;

        const hiddenClass = 'g-hidden';

        for (let i = 0; i < formElements.length; i++) {
            if(formElements[i].classList.contains(newMode)) {
                formElements[i].classList.remove(hiddenClass);
            } else {
                formElements[i].classList.add(hiddenClass);
            }
        }
    }

    _activateTab (event) {
        event.preventDefault();

        if (event.target.classList.contains('tabActive')) {
            return;
        }

        if (!event.target.classList.contains('tab')) {
            return;
        }

        console.log('activateTab');
        
        const form = document.forms.typeForm;

        if (event.target.classList.contains('tab')) {
            const buttons = document.querySelectorAll('.tab');
            buttons.forEach(elem => elem.classList.toggle('tabActive'));
        }

        if (document.forms.typeForm.hours.classList.contains('tabActive')){
            this._changeMode('modeWork');
        }
        else {
            this._changeMode('modeExpenses');
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

        document.forms.typeForm.addEventListener('click', this._activateTab.bind(this));

        document.forms.typeForm.date.addEventListener('blur', this._updateStampingTable.bind(this));

        document.forms.typeForm.reason.addEventListener('change', this._updateTypeOptions.bind(this));

        document.addEventListener('click', this._deleteInterval.bind(this));    
    }

    leaveView() {
        document.querySelector('#btnSubmit').removeEventListener('click', this._stamp.bind(this));
        document.forms.typeForm.removeEventListener('click', this._activateTab.bind(this));
        document.forms.typeForm.date.removeEventListener('blur', this._updateStampingTable.bind(this));
        document.forms.typeForm.reason.removeEventListener('change', this._updateTypeOptions.bind(this));
        document.removeEventListener('click', this._deleteInterval.bind(this));    
    }
}