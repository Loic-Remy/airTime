"use strict";

class ViewStamping extends View
{
    constructor(title)
    {
        super(title);

        this.formHTML = 
				`
				<label for='firstDay'>Du</label>
				<input type='date' name='firstDay' id='firstDay' autofocus>
				<label for='lastDay'>Au</label>
				<input type='date' name='lastDay' id='lastDay'>
				<input type='submit' name='afficher' value='afficher' id='display' class='pointer'>
				`;

/*            `<div>
				<label for='firstDay'>Du</label>
				<input type='date' name='firstDay' id='firstDay' autofocus>
			</div>
			<div>
				<label for='lastDay'>Au</label>
				<input type='date' name='lastDay' id='lastDay'>
			</div>
			<div>
				<input type='submit' name='afficher' value='afficher' id='display'>
			</div>`;
*/
        this.tableHTML = 
            `<thead>
                <tr>
                    <th>date</th>
                    <th class='long'>type</th>
                    <th class='long'>taux</th>
                    <th>à faire</th>
                    <th class='long'>fait</th>
                    <th class='long'>majoré</th>
                    <th>total jour</span></th>
                    <th>+/- jour</span></th>
                    <th>+/- an</span></th>
			    </tr>
		    </thead>
		    <tbody>
		    </tbody>`;
    }

    _formModifier()
    {
		this.form.setAttribute('id', 'stamping');
		this.form.setAttribute('name', 'formDate');

	}
	
	_formEvents()
	{
		document.body.addEventListener('load', setDateAsAttributes('firstDay', firstDayMonth(lastFriday()), ['value']));
		document.body.addEventListener('load', setDateAsAttributes('firstDay', firstDayYear(lastFriday()), ['min']));
		document.body.addEventListener('load', setDateAsAttributes('lastDay', lastFriday(), ['value', 'max']));
	
	
	}

    _tableModifier()
    {
        this.table.setAttribute('id', 'tableStamping');
    }

    _showOrHideDetails(event)
	{
		let currentEl = event.target.parentElement.nextElementSibling;
						
		while (currentEl.classList.contains('detailLine'))
		{
			if (currentEl.classList.contains('hidden'))
			{
				currentEl.classList.replace('hidden', 'shown');
			}
			else
			{
				currentEl.classList.replace('shown', 'hidden');
			}
			currentEl = currentEl.nextElementSibling;
		}
	}

	_buildDayLine(line, entry)
	{
		line.innerHTML = 
			`<td>${entry.date.unixToReadable()}</td>
  		    <td class='long'>${entry.reason}</td>
        	<td class='long'>${entry.ratio}%</td>
        	<td>${entry.todo.toHoursFormat()}</td>
        	<td class='long'>${entry.done.toHoursFormat()}</td>
        	<td class='long'>${entry.overtime.toHoursFormat()}</td>
        	<td>${entry.total.toHoursFormat()}</td>
        	<td>${entry.diff.toHoursFormat()}</td>
			<td>${entry.yearDiff.toHoursFormat()}</td>`;
	}

	_buildDetailLine(line, entry)
	{
		line.innerHTML = 
			`<td></td>
			<td>Période</td>
			<td colspan='8'>${entry}</td>`;
	}

	_buildTableBody(data)
	{
		let formFirstDay = document.forms.formDate.firstDay.value;
		let formLastDay = document.forms.formDate.lastDay.value;

		let currDay			= 	parseInt(formFirstDay[8] + formFirstDay[9], 10);
		let lastDay			=	parseInt(formLastDay[8] + formLastDay[9], 10);
		let currMonth		=	parseInt(formFirstDay[5] + formFirstDay[6], 10);
		let lastMonth		=	parseInt(formLastDay[5] + formLastDay[6], 10);
		let year			= 	parseInt(formLastDay[0] + formLastDay[1] + formLastDay[2] + formLastDay[3], 10)
		let lastDayThisMonth;

		var entry;
		let dayColoration;
		let newLine;
		let tbody = document.createElement('tbody');	
		
		console.log(data);
		console.log('Debut: m=' + currMonth + ' / j=' + currDay);
		console.log('Fin: m=' + lastMonth + ' / j= ' + lastDay);
	
		for (; currMonth <= lastMonth; currMonth++)
		{
			lastDayThisMonth = currMonth === lastMonth ? lastDay : data.entries[currMonth].length;
			console.log(lastDayThisMonth);
			
			for (; currDay <= lastDayThisMonth; currDay++)
			{
				entry = data.entries[currMonth][currDay - 1];

				newLine = document.createElement('tr');
				newLine.classList.add('stampingLine');

				dayColoration = new Date(year, currMonth - 1, currDay);
				dayColoration = dayColoration.getDay();
				
				if (dayColoration === 6 || dayColoration === 0)
					newLine.classList.add('hilight');

				this._buildDayLine(newLine, entry);
				newLine.addEventListener('click', this._showOrHideDetails);

				tbody.appendChild(newLine);
				
				for (let i = 0; i < entry.entries.length; i++)
				{
					newLine = document.createElement('tr');
					
					newLine.classList.add('hidden');
					newLine.classList.add('detailLine');
					
					this._buildDetailLine(newLine, entry.entries[i]);
					tbody.appendChild(newLine);
				}
				
			}

			currDay = 1;
		}

		return tbody;
	}
}