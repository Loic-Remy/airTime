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
            .then( () => location.hash = 'type')
            .catch(error => this.manager.manageError(error));
    }

    displayView()
    {
        this.view.buildPage();
        
        document.forms.login.addEventListener('submit', (e) => this._handleSubmit(e));
    }

    leaveView() {
        document.forms.login.removeEventListener('submit', (e) => this._handleSubmit(e));
    }

}