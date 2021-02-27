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
                    <th>Conditions</th>
                    <th>Valeurs</th>
                </tr>
            </thead>
            <tbody
            </tbody>
            `;
    }

    _buildTableBody(data)
    {
        let tableBody = document.createElement('tbody');
        const year = new Date().getFullYear();

        const cond = data.conditions[`${year}_cond1`];

        tableBody.innerHTML = 
            `
            <tr>
                <td>Début</td>
                <td>${cond.begin.date.substring(0, 10).unixToReadable(false)}</td>
            </tr>
            <tr>
                <td>Fin</td>
                <td>${cond.end.date.substring(0, 10).unixToReadable(false)}</td>
            </tr>
            <tr>
                <td>Solde période préc [heures / vac]</td>
                <td>${cond.report}</td>
            </tr>
            <tr>
                <td>Durée du travail hebdomadaire</td>
                <td>${cond.workweek} heures</td>
            </tr>
            <tr>
                <td>Taux d'activité</td>
                <td>${cond.workratio} %</td>
            </tr>
            <tr>
                <td>Dureé du travail journalier</td>
                <td>${cond.dayhours} heures</td>
            </tr>
            <tr>
                <td>Vacances</td>
                <td>${cond.holiday} jours</td>
            </tr>
            <tr>
                <td>Majoration dimanche</td>
                <td>${cond.sundayratio} %</td>
            </tr>
            `;

        return tableBody;
    }
}