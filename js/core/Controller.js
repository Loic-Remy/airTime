"use strict";

class Controller
{
    constructor(hash)
    {
        if (hash === undefined)
            throw new Error("missing 'hash' value in constructor");

        this.hash = hash;
    }
}

class ControllerDefault extends Controller
{
    constructor(hash)
    {
        super(hash);
        this.view = new ViewDefault('En construction');
    }

    displayView()
    {
        this.view.buildPage();
    }
}

class ControllerSituation extends Controller
{
    constructor(hash)
    {
        super(hash);

        this.manager = new SituationManager(url_situation);
        this.view = new ViewSituation('Situation');
    }

    displayView()
    {
        this.view.buildPage();
        
        let lastDay = function () {
    		return document.querySelector('#date').value;
	    }

    	let year = function () {
		    let year = lastDay();
    		return year.slice(0,4);
	    }
        
        this.manager.getSituation(sessionStorage.getItem('userId'), year(), '1.1', lastDay().unixToSimple())
            .then(response => this.view.updateTable(response));
        
        document.querySelector('#displaySituation').addEventListener('click', (event) => {
            event.preventDefault();	

            this.manager.getSituation(sessionStorage.getItem('userId'), year(), '1.1', lastDay().unixToSimple())
                .then(response => this.view.updateTable(response));
        
        });
    }


}

class ControllerStamping extends Controller
{
    constructor(hash)
    {
        super(hash);

        this.manager = new StampingManager(url_situation);
        this.view = new ViewStamping('Timbrages');
    }

    displayView()
    {
        this.view.buildPage();

        this.manager.getStamping()
            .then(response => this.view.updateTable(response));

        document.getElementById("display").addEventListener('click', (e) => {
			e.preventDefault();
            
            this.manager.getStamping()
                .then(response => this.view.updateTable(response));
		});
    }
}

class ControllerType extends Controller 
{
    constructor(hash)
    {
        super(hash);

        this.manager = new IntervalManager(url_type);
        this.view = new ViewType('Saisie');
    }

    displayView()
    {
        
        this.view.buildPage();

        var interval = new Interval();
        function filterCurrentDay(data)
        {
            return data.filter((element => {
                let date = document.forms.typeForm.date.value;
                console.log(date);
                return element.begin.substring(0, 10) === date;
            }));

        }
       
        interval.fill(document.forms.typeForm);
        
        this.manager.getIntervals(interval)
            .then(response => filterCurrentDay(response))
            .then(response => this.view.updateTable(response));
            
        document.forms.typeForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            interval.fill(document.forms.typeForm);
            this.manager.sendInterval(interval)
                .then((response) => {
                    if (response)
                        return this.manager.getIntervals(interval)
                })
                .then(response => filterCurrentDay(response))
                .then(response => this.view.updateTable(response)); 


            document.forms.typeForm.remark.value = "";
            document.forms.typeForm.begin.focus();

        });
        
        document.forms.typeForm.date.addEventListener('blur', () => {
            let interval = new Interval();
            interval.fill(document.forms.typeForm);
            
            this.manager.getIntervals(interval)
                .then(response => filterCurrentDay(response))
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

class ControllerLogin extends Controller
{
    constructor(hash)
    {
        super(hash);

        this.manager = new LoginManager(url_users);
        this.view = new viewLogin('Connexion');
    }

    displayView()
    {
        this.view.buildPage();
        
        document.forms.login.addEventListener('submit', (event) => {
            event.preventDefault();
        });

        document.forms.login.addEventListener('submit', (event) => {

            this.manager.typedUser = document.forms.login.user.value;
            this.manager.typedPassword = document.forms.login.password.value;

            this.manager.getUser()
                .then(response => this.manager.saveUser(response))
                .then( () => location.hash = 'type')
                .catch(error => this.manager.manageError(error));
    	});

    }

}