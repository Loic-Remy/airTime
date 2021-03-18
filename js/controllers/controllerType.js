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

    displayView()
    {
        
        this.view.buildPage();

        var interval = new Interval();
/*        function filterCurrentDay(data)
        {
            return data.filter((element => {
                let date = document.forms.typeForm.date.value;
                return element.begin.substring(0, 10) === date;
            }));

        }
      */ 
        interval.fill(document.forms.typeForm);
        
        this.manager.getIntervals(interval)
            .then(response => this._filterCurrentDay(response))
            .then(response => this.view.updateTable(response));
            
        document.forms.typeForm.addEventListener('submit', (event) => {
            console.log(`Submit form count ${++counter}`);
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

        });
        
        document.forms.typeForm.date.addEventListener('blur', () => {
            let interval = new Interval();
            interval.fill(document.forms.typeForm);
            
            this.manager.getIntervals(interval)
                .then(response => this._filterCurrentDay(response))
                .then(response => this.view.updateTable(response));
        });

        document.forms.typeForm.reason.addEventListener('change', (event) => {
            if (event.target.value === 'work')
            {   
                document.forms.typeForm.type.options[0].setAttribute('selected', 'true');
                document.forms.typeForm.type.options[0].classList.remove('hidden');
                document.forms.typeForm.type.options[1].removeAttribute('selected');



                document.forms.typeForm.type.classList.add('hidden');
                document.querySelector('#labelType').classList.add('hidden');
                document.forms.typeForm.begin.classList.remove('hidden');
                document.querySelector('#labelBegin').classList.remove('hidden');
                document.forms.typeForm.end.classList.remove('hidden');
                document.querySelector('#labelEnd').classList.remove('hidden');
            }
            else 
            {
                document.forms.typeForm.type.options[0].removeAttribute('selected');
                document.forms.typeForm.type.options[0].classList.add('hidden');
                document.forms.typeForm.type.options[1].setAttribute('selected', 'true');

                document.forms.typeForm.type.classList.remove('hidden');
                document.querySelector('#labelType').classList.remove('hidden');

                document.forms.typeForm.begin.classList.add('hidden');
                document.querySelector('#labelBegin').classList.add('hidden');

                document.forms.typeForm.end.classList.add('hidden');
                document.querySelector('#labelEnd').classList.add('hidden');
            }
        });
    }
}