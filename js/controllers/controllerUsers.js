"use strict";

class ControllerUsers extends Controller
{
    constructor(hash)
    {
        super(hash);

        this.manager = new UserManager(url_users);
        this.view = new ViewUsers('Utilisateurs');
    }
 

    displayView() {
        const users = new User(url_users);

        this.view.buildPage();

        this.manager.getUsers()
            .then(response => this.view.updateTable(response));

    }
}