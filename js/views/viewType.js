"use strict";

class ViewType extends View
{
    constructor(title)
    {
        super(title);

        this.formHTML = 
            `<label for='date'>Date</label>
            <input name='date' type='date'>
            <label for='begin'>Début</label>
            <input name='begin' type='time' value='07:00' required autofocus>
            <label for='end'>Fin</label>
            <input name='end' type='time' value='12:00' required>
            <label for='reason'>Motif</label>
            <select name='reason'>
                <option selected>Travail</option>
                <option>Urgence</option>
            </select>
            <label for='remark'>Remarque</label>
            <input name='remark' type='text'>
            <input name='btnSubmit' type='submit' value='Enregistrer'>`;

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


