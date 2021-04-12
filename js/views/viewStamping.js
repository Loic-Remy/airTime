"use strict";

class ViewStamping extends View
{
    constructor(title)
    {
        super(title);

		this.viewId = 'viewStamping';

        this.formHTML = 
				`
				<label for='firstDay'>Du</label>
				<input type='date' name='firstDay' id='firstDay' autofocus>
				<label for='lastDay'>Au</label>
				<input type='date' name='lastDay' id='lastDay'>
				<input type='submit' name='afficher' value='afficher' id='display' class='pointer'>
				`;

        this.tableHTML = 
            `<thead>
                <tr>
                    <th>date</th>
                    <th class='g-long'>type</th>
                    <th class='g-long'>taux</th>
                    <th>à faire</th>
                    <th class='g-long'>fait</th>
                    <th class='g-long'>majoré</th>
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
		document.body.addEventListener('load', setDateAsAttributes('lastDay', yesterday(), ['value']));
	}

    _tableModifier() {
        this.table.setAttribute('id', 'tableStamping');
    }

	_getStampingDetails() {
		const interval = new Interval();
		const intervalManager = new IntervalManager(url_stamping);

		interval.fill(document.forms.formDate);

		const stamping = intervalManager.getIntervals(interval);


		return stamping;
	}

	_buildDayLine(line, entry)
	{
		line.innerHTML = 
			`<td>${entry.date.unixDateToDDMM()}</td>
  		    <td class='g-long'>${entry.reason}</td>
        	<td class='g-long'>${entry.ratio}%</td>
        	<td>${entry.todo.toHoursFormat()}</td>
        	<td class='g-long'>${entry.done.toHoursFormat()}</td>
        	<td class='g-long'>${entry.overtime.toHoursFormat()}</td>
        	<td>${entry.total.negativeSign()}${entry.total.toHoursFormat()}</td>
        	<td>${entry.diff.negativeSign()}${entry.diff.toHoursFormat()}</td>
			<td>${entry.diff.negativeSign()}${entry.yearDiff.toHoursFormat()}</td>`;
	}

    _buildDetailLine2(rowElem, entry) {
        if (entry.type === 'time')
        {
            rowElem.innerHTML = 
                `<td></td>
				<td>${entry.begin.substring(11, 16)} - ${entry.end.substring(11, 16)}</td>
                <td colspan="2">${entry.reason.translate()}</td>
                <td colspan="5">${entry.remark}</td>`;
        }
        else if (entry.reason === 'driving')
        {
             rowElem.innerHTML = 
                `<td></td>
				<td>${entry.end.substring(11, 16)}</td>
                <td colspan="2">${entry.reason.translate()}</td>
                <td colspan="5">${entry.remark ? entry.remark : ""}</td>`;
        }
        else
        {
           rowElem.innerHTML = 
                `<td></td>
				<td>${entry.type.translate()}</td>
                <td colspan="2">${entry.reason.translate()}</td>
                <td colspan="5">${entry.remark}</td>`;
        }
    }

	_buildDetailLine(line, entry) {
		line.innerHTML = 
			`<td></td>
			<td>Période</td>
			<td colspan='8'>${entry}</td>`;
	}


	_buildTableBody(data) {
		console.log(data);

		let formFirstDay = document.forms.formDate.firstDay.value;
		let formLastDay = document.forms.formDate.lastDay.value;

		let currDay			= 	parseInt(formFirstDay[8] + formFirstDay[9], 10);
		let lastDay			=	parseInt(formLastDay[8] + formLastDay[9], 10);
		let currMonth		=	parseInt(formFirstDay[5] + formFirstDay[6], 10);
		let lastMonth		=	parseInt(formLastDay[5] + formLastDay[6], 10);
		let year			= 	parseInt(formLastDay[0] + formLastDay[1] + formLastDay[2] + formLastDay[3], 10)
		let lastDayThisMonth;

		var entry;
		let intervals;
		let dayColoration;
		let currentDay;
		let newLine;
		let tbody = document.createElement('tbody');	
		
		for (; currMonth <= lastMonth; currMonth++)
		{
			lastDayThisMonth = currMonth === lastMonth ? lastDay : data.stamping.entries[currMonth].length;
			
			for (; currDay <= lastDayThisMonth; currDay++)
			{
				entry = data.stamping.entries[currMonth][currDay - 1];

				newLine = document.createElement('tr');
				newLine.classList.add('stampingLine', 'g-pointer');

				currentDay = new Date(year, currMonth - 1, currDay);
				dayColoration = currentDay.getDay();
				
				if (dayColoration === 6 || dayColoration === 0)
					newLine.classList.add('hilight');

				this._buildDayLine(newLine, entry);

				tbody.appendChild(newLine);

				intervals = IntervalManager.getIntervalsForGivenDay(data.intervals, currentDay.toUnixFormat());
				
				for (let i = 0; i < intervals.length; i++)
				{
					newLine = document.createElement('tr');
					
					newLine.classList.add('g-hidden');
					newLine.classList.add('detailLine');
					
					this._buildDetailLine2(newLine, intervals[i]);
					tbody.appendChild(newLine);
				}
				
			}

			currDay = 1;
		}

		return tbody;
	}
}