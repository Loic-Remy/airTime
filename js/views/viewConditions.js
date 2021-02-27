"use strict";

class viewConditions extends View
{
    constructor(title)
    {
        super(title);

        this.tableHTML =
            `
            <thead>
                <tr>
                    <th>Condition</th>
                    <th>Valeur</th>
                </tr>
            </thead>
            <tbody
            </tbody>
            `;
    }

    _buildTableBody(data)
    {
        let tableBody = document.createElement('tbody');
        const cond = data.conditions;

        tableBody.innerHTML = 
            `
            <tr>
                <td>Début</td>
                <td>${cond.begin.date}</td>
            </tr>
            <tr>
                <td>Fin</td>
                <td>${cond.end.date}</td>
            </tr>
            <tr>
                <td>Solde période préc</td>
                <td>${cond.report}</td>
            </tr>
            <tr>
                <td>Heures par semaine</td>
                <td>${cond.workweek}</td>
            </tr>
            <tr>
                <td>Taux d'activité</td>
                <td>${cond.workratio}</td>
            </tr>
            <tr>
                <td>Heures par jour</td>
                <td>${cond.dayhours}</td>
            </tr>
            <tr>
                <td>Vacances</td>
                <td>${cond.holiday}</td>
            </tr>
            <tr>
                <td>Majoration dimanche</td>
                <td>${cond.sundayratio}</td>
            </tr>
            `;

        return tableBody;
    }
}