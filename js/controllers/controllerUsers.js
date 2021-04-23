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

        return newUsers;
    }
 

    displayView() {
        this.view.buildPage();

            this.manager.getUsers()
            .then(response => this._fetchSituations(response))
            .then(response => this.view.updateTable(response))
            .then(response => document.querySelector('#thName').addEventListener('click', this._orderByName()));
    }

    _orderByName(event) {
        const tableBody = document.querySelector('tbody');
        const nodeList = document.querySelectorAll('tbody tr');
        const lines = Array.from(nodeList);
        
//        lines.sort(this._compareNameAsc);

        lines.sort(this._compareNameDesc);

        tableBody.innerHTML = '';
       
        for (let i = 0; i < lines.length; i++) {
            tableBody.appendChild(lines[i]);
        }
        
        console.log(lines);
    }

    _compareNameAsc(line1, line2) {
        const name1 = line1.cells[1].innerHTML;
        const name2 = line2.cells[1].innerHTML;

        return name1.localeCompare(name2);
    } 
    _compareNameDesc(line1, line2) {
        const name1 = line1.cells[1].innerHTML;
        const name2 = line2.cells[1].innerHTML;

        return name2.localeCompare(name1);
    }
}