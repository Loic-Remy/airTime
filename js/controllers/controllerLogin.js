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
        
        this.manager.typedUser = document.forms.login.user.value;
        this.manager.typedPassword = document.forms.login.password.value;

        this.manager.getUser()
            .then(response => this.manager.saveUser(response))
            .then( () => location.hash = 'type');
    }

    _autoLogIn() {

        if (localStorage.length === 0) {
            return;
        }

        this.manager.typedUser = localStorage.getItem("userName");
        this.manager.typedPassword = localStorage.getItem("userPassword");
        
        this.manager.getUser()
            .then( () => location.hash = 'type');
    }

    displayView()
    {
        this._autoLogIn();

        this.view.buildPage();
        
        document.querySelector('#btnSubmit').addEventListener('click', this._handleSubmit.bind(this));
    }

    leaveView() {
        document.querySelector('#btnSubmit').removeEventListener('click', this._handleSubmit.bind(this));
    }

}