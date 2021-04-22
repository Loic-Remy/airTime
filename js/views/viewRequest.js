"use strict";

class ViewRequest extends View
{
    constructor(title)
    {
        super(title);

        this.viewId = 'viewRequest';
        
        this.formHTML = 
            `
                <label for='dateBegin'>Du</label>
                <input name='dateBegin' type='date' id='inputDateBegin' class='shortInput'>
                <label for='typeBegin'></label>
                <select name='typeBegin' id='typeBegin' class='shortInput'>
                    <option value='morning' selected>Matin</option>
                    <option value='afternoon'>Midi</option>
                </select>
                <label for='dateEnd' >Au</label>
                <input name='dateEnd' type='date' id='inputDateEnd' class='shortInput'>
                <label for='typeEnd'></label>
                <select name='typeEnd' id='typeEnd' class='shortInput'>
                    <option value='morning'>Midi</option>
                    <option value='afternoon' selected>Soir</option>
                </select>
              <label for='reason'>Motif</label>
                <select name='reason'>
                    <option value='holiday' selected>Vacances</option>
                    <option value='army'>Armée/PC/Service civil</option>
                    <option value='health'>Maladie</option>
                    <option value='accident'>Accident</option>
                    <option value='learning'>Cours</option>
                    <option value='overtime'>Compensation heures</option>
                    <option value='unpaid'>Vacances non-payées</option>
                    <option value='paidunemployed'>Chômage technique</option>
                </select>
                <label for='remark'>Remarque</label>
                <input name='remark' type='text'>
                <input name='btnSubmit' type='submit' value='Enregistrer' id='btnSubmit' class='pointer'>
            `;

        this.tableHTML = 
            `<thead>
                <tr>
                    <td>Date</td>
                    <td>Durée</td>
                    <td>Motif</td>
                    <td>Remarque</td>
                    <td></td>
                </tr>
            </thead>
            <tboy>
            </tbody>`;
    }
    
    _formModifier() {
        this.form.id = 'formRequest';
        this.form.name = 'requestForm';
        document.forms.requestForm.dateBegin.autofocus = true;

        document.forms.requestForm.dateBegin.value = new Date().toUnixFormat();
        document.forms.requestForm.dateEnd.value = new Date().toUnixFormat();
    }

    _tableModifier() {
        this.table.id = 'tableType';
    }

    _buildEntryLine(entry, rowElem) {
        if(entry === undefined)
        {
            rowElem.innerHTML = `<td colspan='5'>Aucun timbrage pour cette journée</td>`;
            return;
        }

        if (entry.type === 'time')
        {
            rowElem.innerHTML = 
                `<td class='g-hidden'>${entry.id}</td>
                <td>${entry.begin.substring(0, 10).unixDateToDDMM()}</td>
                <td>${entry.begin.substring(11, 16)} - ${entry.end.substring(11, 16)}</td>
                <td>${entry.reason.translate()}</td>
                <td>${entry.remark}</td>
                <td class='g-cellDelete'><button type='button' class='g-btnDelete g-pointer'>Suppr</button></td>
                `;
        }
        else if (entry.reason === 'driving')
        {
             rowElem.innerHTML = 
                `<td class='g-hidden'>${entry.id}</td>
                <td>${entry.begin.substring(0, 10).unixDateToDDMM()}</td>
                <td>${entry.end.substring(11, 16)}</td>
                <td>${entry.reason.translate()}</td>
                <td>${entry.remark ? entry.remark : ""}</td>
                <td class='g-cellDelete'><button type='button' class='g-btnDelete g-pointer'>Suppr</button></td>
                `;
        }
        else
        {
           rowElem.innerHTML = 
                `<td class='g-hidden'>${entry.id}</td>
                <td>${entry.begin.substring(0, 10).unixDateToDDMM()}</td>
                <td>${entry.type.translate()}</td>
                <td>${entry.reason.translate()}</td>
                <td>${entry.remark}</td>
                <td class='g-cellDelete'><button type='button' class='g-btnDelete g-pointer'>Suppr</button></td>
                `;
        }
    }

    _buildTableBody(data) {
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
            for (let i = data.length - 1; i >= 0; i--)
            {
                newLine = tableBody.insertRow(-1);
                entry = data[i];
                this._buildEntryLine(entry, newLine);
            }
        }
        return tableBody;
    }
}