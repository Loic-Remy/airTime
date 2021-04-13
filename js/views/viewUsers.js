"use strict";

class ViewUsers extends View
{
    constructor(title)
    {
        super(title);

        this.viewId = 'viewUsers';

        this.tableHTML = 
            `<thead>
                <tr>
                    <th class='g-hidden'>Id</th>
                    <th class='.name'>Collaborateur</th>
                    <th>Solde de l'année</th>
                    <th>Solde cumulé</th>
                    <th>Vacances prises</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            `;
    }

    _tableModifier() {
        this.table.id = 'tableUsers';
    }

    _buildUserLine(user) {

        if (user === undefined) {
            return;
        }

        const line = document.createElement('tr');


        line.innerHTML = `
            <td class='g-hidden'>${user.id}</td>
            <td class='name'>${user.name}</td>
            <td class='value'>${user.yearBalance()}</td>
            <td class='value'>${user.currentBalance()}</td>
            <td class='value'>${user.takenHoliday()}</td>
        `

        return line;
    }

    _buildTableBody(users) {
		const tableBody = document.createElement('tbody');
        console.log(users);
		let line, current; 

		for (let i = 0; i < users.length; i++)
		{
            current = users[i];

            if (current.situation) {
                line = this._buildUserLine(current);
                tableBody.append(line);
            }
		}

        return tableBody;
	}
}