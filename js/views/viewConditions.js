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
                    <th class='conditionsTable__line__condition'>Conditions</th>
                    <th class='conditionsTable__line__value'>Valeurs</th>
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
                <td class='conditionsTable__line__conditions'>Début</td>
                <td class='conditionsTable__line__value'>${cond.begin.date.substring(0, 10).unixDateToDDMMYYYY()}</td>
            </tr>
            <tr>
                <td class='conditionsTable__line__conditions'>Fin</td>
                <td class='conditionsTable__line__value'>${cond.end.date.substring(0, 10).unixDateToDDMMYYYY()}</td>
            </tr>
            <tr>
                <td class='conditionsTable__line__conditions'>Solde période préc [heures / vac]</td>
                <td class='conditionsTable__line__value'>${cond.report}</td>
            </tr>
            <tr>
                <td class='conditionsTable__line__conditions'>Durée de la semaine de travail</td>
                <td class='conditionsTable__line__value'>${parseFloat(cond.workweek).toHoursFormat()} heures</td>
            </tr>
            <tr>
                <td class='conditionsTable__line__conditions'>Taux d'activité</td>
                <td class='conditionsTable__line__value'>${cond.workratio} %</td>
            </tr>
            <tr>
                <td class='conditionsTable__line__conditions'>Dureé de la journée de travail</td>
                <td class='conditionsTable__line__value'>${parseFloat(cond.dayhours).toHoursFormat()} heures</td>
            </tr>
            <tr>
                <td class='conditionsTable__line__conditions'>Vacances</td>
                <td class='conditionsTable__line__value'>${cond.holiday} jours</td>
            </tr>
            <tr>
                <td class='conditionsTable__line__conditions'>Majoration dimanche</td>
                <td class='conditionsTable__line__value'>${cond.sundayratio} %</td>
            </tr>
            `;

        return tableBody;
    }
}