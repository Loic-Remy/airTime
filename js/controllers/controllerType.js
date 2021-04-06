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

        if (event.target.value === 'work')
        {   
            form.type.options[0].setAttribute('selected', 'true');
            form.type.options[0].classList.remove('hidden');
            form.type.options[1].removeAttribute('selected');

            form.type.classList.add('hidden');
            document.querySelector('#labelType').classList.add('hidden');
            form.begin.classList.remove('hidden');
            document.querySelector('#labelBegin').classList.remove('hidden');
            form.end.classList.remove('hidden');
            document.querySelector('#labelEnd').classList.remove('hidden');
        }
        else 
        {
            form.type.options[0].removeAttribute('selected');
            form.type.options[0].classList.add('hidden');
            form.type.options[1].setAttribute('selected', 'true');

            form.type.classList.remove('hidden');
            document.querySelector('#labelType').classList.remove('hidden');

            form.begin.classList.add('hidden');
            document.querySelector('#labelBegin').classList.add('hidden');

            form.end.classList.add('hidden');
            document.querySelector('#labelEnd').classList.add('hidden');
        }
    }

    _deleteInterval(event) {
        if(event.target.classList.contains('dailyTable__line__delete') === false) {
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
    }
}