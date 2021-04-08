"use strict";

class ControllerUsers extends Controller
{
    constructor(hash)
    {
        super(hash);

        this.manager = new UserManager(url_users);
        this.view = new ViewUsers('Utilisateurs');
    }

    async _fetchSituations(users) {

        const newUsers = users;

        for(let i = 0; i < newUsers.length; i++) {
            newUsers[i].situation = await newUsers[i].getSituation('2021', '1.1', '31.3');
        }
        console.log(newUsers);

        return newUsers;
    }
 

    displayView() {
        this.view.buildPage();
/*
        this.manager.getUsers()
            .then(response => {
                console.log(response);
                return response.map(async function (elem) {
                    elem.situation = await elem.getSituation('2021', '1.1', '31.3');
                    return await elem;
                })
            })
            .then(response => response.json())
            .then(response => this.view.updateTable(response));
*/
            this.manager.getUsers()
            .then(response => this._fetchSituations(response))
            .then(response => this.view.updateTable(response));
    }
}