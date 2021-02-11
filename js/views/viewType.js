"use strict";

class ViewType extends View
{
    constructor(title)
    {
        super(title);

        this.formHTML = 
            `<div>
                <label for='date'>Date</label>
                <label for='reason'>Motif</label>
                <label for='duration' id='labelDuration' class='hidden'>Durée</label>
                <label for='begin' id='labelBegin'>Début</label>
                <label for='end' id='labelEnd'>Fin</label>
                <label for='remark'>Remarque</label>
            </div>
            <div>
                <input name='date' type='date'>
                <select name='reason'>
                    <option value='work' selected>Travail</option>
                    <option value='holiday'>Vacances</option>
                    <option value='holiday'>Armée/PC/Service civil</option>
                    <option>Maladie</option>
                    <option>Accident</option>
                    <option>Cours</option>
                    <option>Compensation heures</option>
                    <option>Vacances non-payées</option>
                    <option>Chômage technique</option>
                </select>
                <select name='duration' class='hidden'>
                    <option selected>Jour entier</option>
                    <option>Matin</option>
                    <option>Après-midi</option>
                </select>
                <input name='begin' type='time' value='07:00' required autofocus>
                <input name='end' type='time' value='12:00' required>
                <input name='remark' type='text'>
                <input name='btnSubmit' type='submit' value='Enregistrer'>
            </div>`;

        this.tableHTML = 
            `<thead>
                <tr>
                    <td>Début</td>
                    <td>Fin</td>
                    <td>Motif</td>
                    <td>Type</td>
                    <td>Remarque</td>
                </tr>
            </thead>
            <tboy>
            </tbody>`;
    }
    
    _formModifier() 
    {
        this.form.name = 'typeForm';
        this.form.classList.add('multiForm');

        document.forms.typeForm.date.value = new Date().toUnixFormat();
    }

    _formEvents() {}

    _tableModifier()
    {
        this.table.id = 'dayTable';
    }

    _buildEntryLine(entry, rowElem)
    {
        if(entry === undefined)
        {
            rowElem.innerHTML = `<td colspan='5'>Aucun timbrage pour cette journée</td>`;
        }
        else 
        {
            rowElem.innerHTML = 
                `<td>${entry.begin.substring(11, 16)}</td>
                <td>${entry.end.substring(11, 16)}</td>
                <td>${entry.reason.translate()}</td>
                <td>${entry.type.translate()}</td>
                <td>${entry.remark}</td>`;
        }
    }

    _buildTableBody(data)
    {
        let tableBody = document.createElement('tbody');
        let newLine;
        let entry;

        if (data.length === 0)
        {
            newLine = tableBody.insertRow(-1);
            this._buildEntryLine(entry, newLine);
        }
        else
        {
            for (let i = 0; i < data.length; i++)
            {
                newLine = tableBody.insertRow(-1);
                entry = data[i];
                this._buildEntryLine(entry, newLine);
            }
        }
        return tableBody;
    }
}


