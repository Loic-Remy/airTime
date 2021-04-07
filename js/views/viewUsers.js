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
        const line = document.createElement('tr');

        line.innerHTML = `
            <td class='hidden'>${user.id}</td>
            <td>${user.name}</td>
            <td></td>
            <td></td>
            <td></td>
        `

        return line;
    }

    _buildTableBody(users)
	{
		const tableBody = document.createElement('tbody');

		let line;  

		for (let i = 0; i < users.length; i++)
		{
            line = this._buildUserLine(users[i]);
            tableBody.append(line);
		}

        return tableBody;
	}
}