"use strict";

class ViewType extends View
{
    constructor(title)
    {
        super(title);

        this.viewId = 'viewType';
        
        this.formHTML = 
            `
                <button name='hours' class='tab tabActive modeDriving modeWork modeAbsence modeExpenses g-pointer'>Heures</button>
                <button name='expenses' class='tab modeDriving modeWork modeAbsence modeExpenses g-pointer'>Frais</button>
                <label for='date'class='modeDriving modeWork modeAbsence modeExpenses'>Date</label>
                <input name='date' type='date' class='modeDriving modeWork modeAbsence modeExpenses'>
                <label for='dateBegin' class=' g-hidden'>Début</label>
                <input name='dateBegin' type='date' class=' g-hidden'>
                <label for='dateEnd' class=' g-hidden'>Fin</label>
                <input name='dateEnd' type='date' class=' g-hidden'>
                <label for='reason' class='modeWork modeDriving modeAbsence'>Motif</label>
                <select name='reason' class='modeWork modeDriving modeAbsence'>
                    <option value='work' selected>Travail</option>
                    <option value='driving'>Conduite (OTR)</option>
                    <option value='holiday'>Vacances</option>
                    <option value='army'>Armée/PC/Service civil</option>
                    <option value='health'>Maladie</option>
                    <option value='accident'>Accident</option>
                    <option value='learning'>Cours</option>
                    <option value='overtime'>Compensation heures</option>
                    <option value='unpaid'>Vacances non-payées</option>
                    <option value='paidunemployed'>Chômage technique</option>
                </select>
                <label for='type' id='labelType' class='modeAbsence g-hidden'>Durée</label>
                <select name='type' class='modeAbsence g-hidden'>
                    <option value='time' selected>Timbrage</option>
                    <option value='wholeday'>Jour entier</option>
                    <option value='morning'>Matin</option>
                    <option value='afternoon'>Après-midi</option>
                </select>
                <label for='begin' id='labelBegin' class='modeWork'>Début</label>
                <input name='begin' type='time' value='07:00' class='modeWork' required>
                <label for='end' id='labelEnd' class='modeWork'>Fin</label>
                <input name='end' type='time' value='12:00' class='modeWork' required>
                <label for='duration' id='labelDuration' class='modeDriving g-hidden'>Durée</label>
                <input name='duration' class='modeDriving g-hidden' type='time' value='00:00' class='modeDriving' required>
                <label for='amount' class='modeExpenses g-hidden'>Montant</label>
                <input name='amount' type='number' min='0' class='modeExpenses g-hidden'>
                <label for='picture' class='modeExpenses g-hidden'>Justificatif</label>
                <input name='picture' type='file' capture='environment' class='modeExpenses g-hidden'>
                <label for='remark' class='modeWork modeAbsence modeDriving modeExpenses'>Note</label>
                <input name='remark' type='text' class='modeWork modeAbsence modeDriving modeExpenses'>
                <input name='btnSubmit' type='submit' value='Enregistrer' id='btnSubmit' class='modeWork modeAbsence modeDriving g-pointer'>
                <input name='btnSubmitExpenses' type='submit' value='Enregistrer' id='btnSubmitExpenses' class='modeExpenses g-hidden g-pointer'>
            `;

        this.tableHTML = 
            `<thead>
                <tr>
                    <td>timbrage</td>
                    <td>motif</td>
                    <td>remarque</td>
                    <td></td>
                </tr>
            </thead>
            <tboy>
            </tbody>`;
    }
    
    _formModifier() {
        this.form.id = 'formType';
        this.form.name = 'typeForm';
        this.form.classList.add('multiForm');
        document.forms.typeForm.begin.autofocus = true;

        document.forms.typeForm.date.value = new Date().toUnixFormat();
    }

    _tableModifier() {
        this.table.id = 'tableType';
    }

    _buildEntryLine(entry, rowElem) {
        if(entry === undefined)
        {
            rowElem.innerHTML = `<td colspan='4'>Aucun timbrage pour cette journée</td>`;
            return;
        }

        if (entry.type === 'time' && entry.reason != 'driving')
        {
            rowElem.innerHTML = 
                `<td class='g-hidden'>${entry.id}</td>
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