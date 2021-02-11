"use strict";

class ViewSituation extends View
{
	constructor(title)
	{
		super(title);

		this.formHTML = 
			`<div>
				<label for='date'>Au</label>
			</div>
			<div>
				<input type="date" id="date" name="date" autofocus>
				<input type="submit" value="afficher" id="displaySituation" name="display">
			</div>`;

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
		document.body.addEventListener('load', setDateAsAttributes('date', lastFriday(), ['value', 'max']));
		document.body.addEventListener('load', setDateAsAttributes('date', firstDayYear(), ['min']));
	}

	_tableModifier()
	{
		this.table.id = 'situation';
	}

	_buildTableBody(data)
	{
		let tbody = document.createElement('tbody');
	
		let diff = data.diff;
		diff = Math.round(data.diff * 100) / 100;

		tbody.append(
			this._buildLineFromSummary('Travail planifié', '-', data, 'globalTodo'),
			this._buildLineFromSummary('Accident', '+', data, 'accident'),
			this._buildLineFromSummary('Maladie', '+', data, 'health'),
			this._buildLineFromSummary('Formation', '+', data, 'learning'),
			this._buildLineFromSummary('Armée', '+', data, 'army'),
			this._buildLineFromSummary('Vacances', '+', data, 'holiday'),
			this._buildLineFromSummary('Non-payé', '+', data, 'unpaid'),
			this._buildLineFromSummary('Autres absences payées', '+', data, 'paidunemployed'),
			this._buildLineFromSituation('A faire', '-', data, 'todo'),
			this._buildLineFromSituation('Travail effectif', '+', data, 'done'),
			this._buildLineFromValue('Différence annuelle', '-', data.todo - data.done, 'annualDiff'),
			this._buildLineFromSummary('Report', '+', data, 'report'),
			this._buildLineFromSummary('Payé', '-', data, 'paid'),
			this._buildLineFromSummary('Manuel', '-', data, 'manual'),
			this._buildLineFromValue('Solde cumulé', '+', diff, 'manual')
		);
			 
		return tbody;
	}


	_fillLine(title, sign, hours, days)
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
				<td>${hours}</td>
				<td>${days}</td>`;

		return line;
	}

	_buildLineFromSummary(title, sign, data, key)
	{
		return this._fillLine(title, sign, data.summary.hours[key], data.summary.days[key]);
	}

	_buildLineFromSituation(title, sign, data, key)
	{
		return this._fillLine(title, sign, data[key], '--');
	}

	_buildLineFromValue(title, sign, value)
	{
		return this._fillLine(title, sign, value, '--');
	}

/*	
	fillLine(data, obj, sign)
	{
		let cells = document.getElementById(obj).children;

		cells[1].innerHTML = data.summary.hours[obj] == 0 ? "" : sign;
		cells[2].innerHTML = data.summary.hours[obj];
		cells[3].innerHTML = data.summary.days[obj];
	}

	fillLineDirect(data, obj, sign)
	{
		let cells = document.getElementById(obj).children;

		cells[1].innerHTML = data[obj] == 0 ? "" : sign;
		cells[2].innerHTML = data[obj];
		cells[3].innerHTML = "--";
	}

	fillLineEasy(value, obj, sign)
	{
		let cells = document.getElementById(obj).children;

		cells[1].innerHTML = (value == 0) ? "" : sign;
		cells[2].innerHTML = value;
		cells[3].innerHTML = "--";
	}

	situationTableConstruct(data)
	{
		var workToDo = {
			days: 0,
			hours : 0	
		}
		
		let days = data.summary.days;
		let hours = data.summary.hours;

		let diff = data.diff;
		diff = Math.round(data.diff * 100) / 100;

		workToDo.days = days.globalTodo - (days.accident+ days.army + days.health + days.holiday + days.learning + days.unpaid + days.paidunemployed);
		workToDo.hours = hours.globalTodo - (hours.accident + hours.army + hours.health + hours.holiday + hours.learning + hours.unpaid + hours.paidunemployed);

		this.fillLine(data, "globalTodo", "-");
		this.fillLine(data, "accident", "+");
		this.fillLine(data, "health", "+");
		this.fillLine(data, "learning", "+");
		this.fillLine(data, "army", "+");
		this.fillLine(data, "holiday", "+");
		this.fillLine(data, "unpaid", "+");
		this.fillLine(data, "paidunemployed", "+");

		this.fillLineDirect(data, "todo", "-");
		this.fillLineDirect(data, "done", "+");

		this.fillLineEasy(data.todo - data.done, "annualDiff", "-");

		this.fillLine(data, "report", "+");
		this.fillLine(data, "paid", "-");
		this.fillLine(data, "manual", "-");

		let cells = document.getElementById("diff").children;
		cells[1].innerHTML = (diff < 0) ? "-" : "+";
		cells[2].innerHTML = Math.abs(diff);
		cells[3].innerHTML = "--";

	}

	constructTable(userId, year, firstDay, lastDay)
	{
		this.getSituation(userId, year, firstDay, lastDay).then(response => this.situationTableConstruct(response));
	}

	updateTable(userId, year, firstDay, lastDay)
	{
		this.constructTable(userId, year, firstDay, lastDay);
	}

*/
}