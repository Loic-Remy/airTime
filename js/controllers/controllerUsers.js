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
            .then(response => this.view.updateTable(response));
            
        document.querySelector('#thName').addEventListener('click', () => {
            this._orderBy(this._compareNameAsc);
        });
        
        document.querySelector('#thYearBalance').addEventListener('click', () => {
            this._orderBy(this._compareYearBalanceAsc);
        });
        
        document.querySelector('#thBalance').addEventListener('click', () => {
            this._orderBy(this._compareBalanceAsc);
        });
        
        document.querySelector('#thTakenHoliday').addEventListener('click', () => {
            this._orderBy(this._compareTakenHolidayAsc);
        });
 
    }

    _orderBy(orderFunction) {
        const tableBody = document.querySelector('tbody');
        const nodeList = document.querySelectorAll('tbody tr');
        const lines = Array.from(nodeList);
        let order = 'asc';
        
        lines.sort(orderFunction.bind(this));

        if(event.currentTarget.getAttribute('data-order') === 'asc') {
            lines.reverse();
            order = 'desc';
        }

        tableBody.innerHTML = '';
       
        for (let i = 0; i < lines.length; i++) {
            tableBody.appendChild(lines[i]);
        }
    
        event.currentTarget.setAttribute('data-order', order);
    }

    _compareNameAsc(line1, line2) {
        const pos = this._findCellIndex('name');
        const name1 = line1.cells[pos].innerHTML;
        const name2 = line2.cells[pos].innerHTML;

        return name1.localeCompare(name2);
    } 

    _compareYearBalanceAsc(line1, line2) {
        const pos = this._findCellIndex('yearBalance');
        const balance1 = line1.cells[pos].innerHTML;
        const balance2 = line2.cells[pos].innerHTML;
        
        return balance1.localeCompare(balance2);
    }
    
    _compareBalanceAsc(line1, line2) {
        const pos = this._findCellIndex('totalBalance');
        const balance1 = line1.cells[pos].innerHTML;
        const balance2 = line2.cells[pos].innerHTML;
        
        return balance1.localeCompare(balance2);
    }

    _compareTakenHolidayAsc(line1, line2) {
        const pos = this._findCellIndex('takenHoliday');
        const balance1 = line1.cells[pos].innerHTML;
        const balance2 = line2.cells[pos].innerHTML;
        
        return balance1.localeCompare(balance2);
    }

    _findCellIndex(key) {
        const cells = ['id', 'name', 'yearBalance', 'totalBalance', 'takenHoliday'];

        return cells.indexOf(key);
    }

}