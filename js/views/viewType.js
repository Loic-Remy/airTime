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
                <label for='type' id='labelType' class='hidden'>Durée</label>
                <label for='begin' id='labelBegin'>Début</label>
                <label for='end' id='labelEnd'>Fin</label>
                <label for='remark'>Remarque</label>
            </div>
            <div>
                <input name='date' type='date'>
                <select name='reason'>
                    <option value='work' selected>Travail</option>
                    <option value='holiday'>Vacances</option>
                    <option value='army'>Armée/PC/Service civil</option>
                    <option value='health'>Maladie</option>
                    <option value='accident'>Accident</option>
                    <option value='learning'>Cours</option>
                    <option value='overtime'>Compensation heures</option>
                    <option value='unpaid'>Vacances non-payées</option>
                    <option value='paidunemployed'>Chômage technique</option>
                </select>
                <select name='type' class='hidden'>
                    <option value='time' selected>Timbrage</option>
                    <option value='wholeday'>Jour entier</option>
                    <option value='morning'>Matin</option>
                    <option value='afternoon'>Après-midi</option>
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


