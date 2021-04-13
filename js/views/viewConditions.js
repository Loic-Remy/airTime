"use strict";

class viewConditions extends View
{
    constructor(title)
    {
        super(title);

        this.viewId = 'viewConditions';

        this.tableHTML =
            `
            <thead>
                <tr>
                    <th class='condition'>Conditions</th>
                    <th class='value'>Valeurs</th>
                </tr>
            </thead>
            <tbody
            </tbody>
            `;
    }

    _tableModifier()
    {
        this.table.id = 'conditionsTable';
    }

    _buildTableBody(data)
    {
        let tableBody = document.createElement('tbody');
        const year = new Date().getFullYear();

        const cond = data.conditions[`${year}_cond1`];

        tableBody.innerHTML = 
            `
            <tr>
                <td class='condition'>Début</td>
                <td class='value'>${cond.begin.date.substring(0, 10).unixDateToDDMMYYYY()}</td>
            </tr>
            <tr>
                <td class='condition'>Fin</td>
                <td class='value'>${cond.end.date.substring(0, 10).unixDateToDDMMYYYY()}</td>
            </tr>
            <tr>
                <td class='condition'>Solde période préc [heures / vac]</td>
                <td class='value'>${cond.report}</td>
            </tr>
            <tr>
                <td class='condition'>Durée de la semaine de travail</td>
                <td class='value'>${parseFloat(cond.workweek).toHoursFormat()} heures</td>
            </tr>
            <tr>
                <td class='condition'>Taux d'activité</td>
                <td class='value'>${cond.workratio} %</td>
            </tr>
            <tr>
                <td class='condition'>Dureé de la journée de travail</td>
                <td class='value'>${parseFloat(cond.dayhours).toHoursFormat()} heures</td>
            </tr>
            <tr>
                <td class='condition'>Vacances</td>
                <td class='value'>${cond.holiday} jours</td>
            </tr>
            <tr>
                <td class='condition'>Majoration dimanche</td>
                <td class='value'>${cond.sundayratio} %</td>
            </tr>
            `;

        return tableBody;
    }
}