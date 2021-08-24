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
                    <th id='thName' class='name g-pointer'>Collaborateur</th>
                    <th></th>
                    <th id='thYearBalance' class='value g-pointer'>Solde de l'année</th>
                    <th></th>
                    <th id='thBalance' class='value g-pointer'>Solde cumulé</th>
                    <th></th>
                    <th id='thTakenHoliday' class='value g-pointer'>Vacances prises</th>
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
            <td>${user.yearBalance().negativeSign()}</td>
            <td class='value'>${user.yearBalance().toHoursFormat()}</td>
            <td>${user.currentBalance().negativeSign()}</td>
            <td class='value'>${user.currentBalance().toHoursFormat()}</td>
            <td>${user.takenHoliday().negativeSign()}</td>
            <td class='value'>${user.takenHoliday()}</td>
        `

        return line;
    }

    _buildTableBody(users) {
		const tableBody = document.createElement('tbody');
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