"use strict";

class ViewUsers extends View
{
    constructor(title)
    {
        super(title);

        this.tableHTML = 
            `<thead>
                <tr>
                    <th class='hidden'>Id</th>
                    <th>Collaborateur</th>
                    <th>Solde de l'année</th>
                    <th>Solde cumulé</th>
                    <th>Vacances prises</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            `;
    }

    _buildUserLine(user) {

        if (user === undefined) {
            return;
        }

        const line = document.createElement('tr');


        line.innerHTML = `
            <td class='hidden'>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.yearBalance()}</td>
            <td>${user.currentBalance()}</td>
            <td>${user.takenHoliday()}</td>
        `

        return line;
    }

    _buildTableBody(users) {
		const tableBody = document.createElement('tbody');
        console.log(users);
		let line;  

		for (let i = 0; i < users.length; i++)
		{
            line = this._buildUserLine(users[i]);
            tableBody.append(line);
		}

        return tableBody;
	}
}