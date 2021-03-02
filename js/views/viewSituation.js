"use strict";

class ViewSituation extends View
{
	constructor(title)
	{
		super(title);

		this.formHTML = 
			`
				<label for='date'>Au</label>
				<input type="date" id="date" name="date" autofocus>
				<input type="submit" value="afficher" id="displaySituation" name="display" class='pointer'>
			`;

		this.tableHTML =
			`<thead>
				<tr>
					<th></th>
					<th></th>
					<th>Heures</th>
					<th>Jours</th>
				</tr>
			</thead>
			<tbody>
			</tbody>`;
	}

	_formModifier()
	{
		this.form.id = 'form';
		this.form.name = 'formSituation';
		document.body.addEventListener('load', setDateAsAttributes('date', lastFriday(), ['value', 'max']));
		document.body.addEventListener('load', setDateAsAttributes('date', firstDayYear(), ['min']));
	}

	_tableModifier()
	{
		this.table.id = 'tableSituation';
	}

	_buildTableBody(data)
	{
		let tbody = document.createElement('tbody');
		let situationDate = document.forms.formSituation.date.value.unixDateToDDMMYYYY();
	
		let diff = data.diff;
		diff = Math.round(data.diff * 100) / 100;

		

		tbody.append(
			this._buildLineFromSummary('Travail planifié', '-', data, 'globalTodo', 'hilight'),
			this._buildLineFromSummary('&nbsp;&nbsp;Accident', '+', data, 'accident'),
			this._buildLineFromSummary('&nbsp;&nbsp;Maladie', '+', data, 'health'),
			this._buildLineFromSummary('&nbsp;&nbsp;Formation', '+', data, 'learning'),
			this._buildLineFromSummary('&nbsp;&nbsp;Armée', '+', data, 'army'),
			this._buildLineFromSummary('&nbsp;&nbsp;Vacances', '+', data, 'holiday'),
			this._buildLineFromSummary('&nbsp;&nbsp;Non-payé', '+', data, 'unpaid'),
			this._buildLineFromSummary('&nbsp;&nbsp;Autres absences payées', '+', data, 'paidunemployed'),
			this._buildLineFromSituation('Travail à effectuer', '-', data, 'todo', 'hilight'),
			this._buildLineFromSituation('&nbsp;&nbsp;Travail effectif', '+', data, 'done'),
			this._buildLineFromValue('Différence annuelle', '-', data.todo - data.done, 'hilight'),
			this._buildLineFromSummary('&nbsp;&nbsp;Solde année précédente', '+', data, 'report'),
			this._buildLineFromSummary('&nbsp;&nbsp;Heures payée', '-', data, 'paid'),
			this._buildLineFromSummary('&nbsp;&nbsp;Correction manuelle', '-', data, 'manual'),
			this._buildLineFromValue(`Solde cumulé au ${situationDate}`, '+', diff, 'hilight')
		);
			 
		return tbody;
	}


	_fillLine(title, sign, hours, days, classNames)
	{
		let signToPrint;
		let line;

		if (hours === 0) {
			signToPrint = "";
		}
		else if (hours > 0) {
			signToPrint = sign;
		}
		else if (hours < 0) {
			signToPrint = sign === '+' ? '-' : '+';
		}
		else {
			signToPrint = "";
		}

		line = document.createElement('tr');
		line.innerHTML = 
			`<th>${title}</th>
				<td>${signToPrint}</td>
				<td>${hours.toHoursFormat()}</td>
				<td>${days}</td>`;

		line.classList.add(classNames);

		return line;
	}

	_buildLineFromSummary(title, sign, data, key, classNames)
	{
		return this._fillLine(title, sign, data.summary.hours[key], data.summary.days[key], classNames);
	}

	_buildLineFromSituation(title, sign, data, key, classNames)
	{
		return this._fillLine(title, sign, data[key], '--', classNames);
	}

	_buildLineFromValue(title, sign, value, classNames)
	{
		return this._fillLine(title, sign, value, '--', classNames);
	}
}