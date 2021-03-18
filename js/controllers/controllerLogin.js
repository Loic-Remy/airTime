"use strict";

class ControllerLogin extends Controller
{
    constructor(hash)
    {
        super(hash);

        this.manager = new LoginManager(url_users);
        this.view = new viewLogin('Connexion');
    }

    _handleSubmit(event) {
        event.preventDefault();
        console.log(`Event.target = ${event.target}`);
        console.log('passage');
        
        this.manager.typedUser = document.forms.login.user.value;
        this.manager.typedPassword = document.forms.login.password.value;

        this.manager.getUser()
            .then(response => this.manager.saveUser(response))
            .then( () => location.hash = 'type')
            .catch(error => this.manager.manageError(error));
    }

    displayView()
    {
        this.view.buildPage();
        
        document.querySelector('#btnSubmit').addEventListener('click', this._handleSubmit.bind(this));
    }

    leaveView() {
        document.querySelector('#btnSubmit').removeEventListener('click', this._handleSubmit.bind(this));
    }

}