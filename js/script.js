
class Header
{
	constructor(url)
	{
		this.url = url;
	}
	
	async getHeader()
	{
		let response = await fetch(this.url);
		return await response.text();
	}

	display()
	{
		this.getHeader()
			.then(response => {
				document.getElementById("header").innerHTML = response;
				document.getElementById("identity").innerHTML = sessionStorage.getItem('userName');
				});
	}
}

var header = new Header(url_header);

if (document.querySelector('h2').innerHTML != 'connexion')
{
	header.display();
}

var loginPage = document.querySelector('h2').innerHTML === 'connexion';

if (loginPage)
{
	document.querySelector('#submit').addEventListener('click', function (event) {
		sessionStorage.setItem('userId', '4OsUdM6QkP311');
		sessionStorage.setItem('userName', 'Etienne Jordan');
	});
}


function displayDetails()
{
	let elem = document.getElementsByClassName("details");
	let size = elem.length
	for (let i = 0; i < size; i++){
		elem[i].style.display = "contents";
	}


}

function hiddeDetails()
{
	let elem = document.getElementsByClassName("details");
	let size = elem.length
	for (let i = 0; i < size; i++){
		elem[i].style.display = "none";
	}


}

function display_or_hide_children(element)
{
	let target = element.parentElement;
	let array = target.getElementsByClassName("details")	

	if (array[0].classList.contains("hidden") )
	{
		array[0].style.display = "contents";
		array[0].classList.replace("hidden", "shown");
	}
	else if (array[0].classList.contains("shown") )
	{
		array[0].style.display = "none";
		array[0].classList.replace("shown", "hidden");
	}
}

function display_or_hide_menu()
{
	let menu = document.getElementById("menu");
	
	if (menu.classList.contains("hidden") )
	{
		menu.style.display = "contents";
		menu.classList.replace("hidden", "shown");
	}
	else if (menu.classList.contains("shown") )
	{
		menu.style.display = "none";
		menu.classList.replace("shown", "hidden");
	}
}

class Users
{
	constructor(url)
	{
		this.url = url;
	}

	async getUsers() 
	{
		let data = await fetch(this.url);

		return await data.json();
	}

	usersTableConstruct(list)
	{
		let table = document.getElementById("users_tbody");

		let cell;
		let line;  

		let entry;

		for (let i = 0; i < list.length; i++)
		{
			entry = list[i];

			line = table.insertRow(-1);
			
			cell = line.insertCell(0);
			cell.innerHTML = `${entry.id}`;

			cell = line.insertCell(1);
			cell.innerHTML = `${entry.commonName}`;

			cell = line.insertCell(2);
			cell.innerHTML = "";
			
			cell = line.insertCell(3);
			let active = entry.disabled === null ? "OUI" : "NON"; 
			cell.innerHTML = `${active}`;
		}

		document.getElementById("totalRows").innerHTML = list.length;
	}

	log()
	{
		this.getUsers().then(response => console.log(response));
	}

	constructTable()
	{
		this.getUsers().then(response => this.usersTableConstruct(response));
	}
}

var usersPage = document.querySelector('h2').innerHTML === 'Utilisateurs';

if (usersPage)
{
	let users = new Users(url_users);

	let body = document.querySelector('body');
	body.addEventListener('load', users.constructTable());
}

class Situation
{
	constructor(url)
	{
		this.url = url;
	}

	async getSituation(userId, year, firstDay, lastDay)
	{
		let url = new URL(this.url);

		url.searchParams.append('year', year);
		url.searchParams.append('id', userId);
		url.searchParams.append('from', firstDay);
		url.searchParams.append('to', lastDay);

		let response = await fetch(url);

		return await response.json();
	}
	
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
}

var situationPage = document.querySelector('h2').innerHTML === 'Situation';

if (situationPage)
{
	document.body.addEventListener('load', setDateAsAttributes('date', lastFriday(), ['value', 'max']));
	document.body.addEventListener('load', setDateAsAttributes('date', firstDayYear(), ['min']));

	let lastDay = function () {
		return document.querySelector('#date').value;
	}

	let year = function () {
		let year = lastDay();
		return year.slice(0,4);
	}

	var situation = new Situation(url_situation);

	situation.constructTable(sessionStorage.getItem('userId'), year(), '1.1', convertUnixDateToSimple(lastDay()));

	document.querySelector('#displaySituation').addEventListener('click', function (event) {
		event.preventDefault();	
		situation.updateTable('4OsUdM6QkP311', year(), '1.1', convertUnixDateToSimple(lastDay()));
	})
}



class Conditions
{
	constructor(url)
	{
		this.url = url;
		this.conditions = null;
	}

	async getConditions() 
	{	
		let url = new URL(this.url);

		let year = '2020';
		let worker_id = sessionStorage.getItem('userId');
		let first_day = '1.1';
		let last_day = '31.12';


		url.searchParams.append('year', year);
		url.searchParams.append('id', worker_id);
		url.searchParams.append('from', first_day);
		url.searchParams.append('to', last_day);

		let response = await fetch(url);
		return await response.json();
	}
	
	condElement(id, title, value)
	{
		let div = document.createElement('div');
		div.setAttribute('id', id);
		div.classList.add('condElem');

		let titleP = document.createElement('p');
		let valueP = document.createElement('p');

		titleP.setAttribute('class', 'condTitle');
		valueP.setAttribute('class', 'condValue');

		titleP.textContent = title;
		valueP.textContent = value;

		div.append(titleP, valueP);

		return div;
	}

	conditionsConstructView(data)
	{
		let posForInsertion = document.querySelector('div#condList');

		let keys = Object.keys(data.conditions);

		keys.reverse();
		
		for (let i = 0; i < keys.length; i++)
		{
			if (keys[i].slice(0, 4) < firstYear)
			{
				continue;
			}

			let cond = data.conditions[keys[i]];
		
			let newCond = document.createElement('div');
			newCond.classList.add("conditionsSet");
			
			newCond.append(this.condElement('begin', 'Début', cond.begin.date.slice(0,10)));
			newCond.append(this.condElement('end', 'Fin', cond.end.date.slice(0,10)));
			newCond.append(this.condElement('reportHour', 'Solde année précédente (vac/heures)', cond.report));
			newCond.append(this.condElement('workweek', 'Heures par semaine', cond.workweek));
			newCond.append(this.condElement('workratio', 'Taux d\'activité', cond.workratio));
			newCond.append(this.condElement('dayhours', 'Heures par jour', cond.dayhours));
			newCond.append(this.condElement('holiday', 'Vacances', cond.holiday));
			newCond.append(this.condElement('sundayratio', 'Majoration dimanche', cond.sundayratio));

			posForInsertion.append(newCond);
		}
	}

	constructView()
	{
		this.getConditions().then(response => this.conditionsConstructView(response));
	}
}

var conditionsPage = document.querySelector('h2').innerHTML === 'Conditions';

if (conditionsPage)
{
	let conditions = new Conditions(url_situation);
	
	document.body.addEventListener('load', conditions.constructView());
}

class Stamping 
{
	constructor(url)
	{
		this.url = url;
		this.response = null;
	}

	async getStamping()
	{		
		let url = new URL(this.url);
		console.log(url);

		let year = document.querySelector('#firstDay').value;
		year = year[0] + year[1] + year[2] + year[3];
		let worker_id = sessionStorage.getItem('userId');
		let first_day = '1.1';
		let last_day = convertUnixDateToSimple(document.querySelector('#lastDay').value);
		
		url.searchParams.append('year', year);
		url.searchParams.append('id', worker_id);
		url.searchParams.append('from', first_day);
		url.searchParams.append('to', last_day);

		let response = await fetch(url);
		console.log(response);
		return await response.json();
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

	_buildNoDataLine(line)
	{
		let newCell = line.insertCell(-1);
		newCell.setAttribute('colspan', '9');
		newCell.innerHTML = 'Aucun timbrage pour la période sélectionnée';
	}

	_buildDayLine(line, entry)
	{
		let position;
		let value;
		let util;
		let classAttribute = null;

		for (let i = 0; i < 9; i++)
		{
			line.insertCell(-1);
		}

		for (const key in entry)
		{
			value = entry[key];
			util = true;

			switch (key)
			{
				case 'date':
					position = 0;
					value = unixDateToReadable(value, true);
					break;
				case 'reason':
					position = 1;
					break;
				case 'ratio':
					position = 2;
					value = value + ' %';
					classAttribute = 'long';
					break;
				case 'todo':
					position = 3;
					value = decimalToHours(value);
					break;
				case 'done':
					position = 4;
					value = decimalToHours(value);
					break;
				case 'overtime':
					position = 5;		
					value = decimalToHours(value);
					break;
				case 'total':
					position = 6;
					value = decimalToHours(value);
					break;
				case 'diff':
					position = 7;
					value = decimalToHours(value);
					break;
				case 'yearDiff':
					position = 8;
					value = decimalToHours(value);
					break;
				default:
					util = false;
					break;
			}
	
			if (util)
			{
				line.children[position].innerHTML = value;
			}
			if (classAttribute)
			{
				line.children[position].classList.add(classAttribute);
				classAttribute = null;
			}
		}

	}

	_buildDetailLine(line, entry)
	{
		for (let i = 0; i < 3; i++)
		{
			line.insertCell(-1);
		}
		
		line.children[1].innerHTML = 'Période'
		
		line.children[2].setAttribute("colspan", "8");
		line.children[2].innerHTML = entry;
	}

	_constructTable(data, formFirstDay, formLastDay)
	{
		let currDay			= 	parseInt(formFirstDay[8] + formFirstDay[9], 10);
		let lastDay			=	parseInt(formLastDay[8] + formLastDay[9], 10);
		let currMonth		=	parseInt(formFirstDay[5] + formFirstDay[6], 10);
		let lastMonth		=	parseInt(formLastDay[5] + formLastDay[6], 10);
		let year			= 	parseInt(formLastDay[0] + formLastDay[1] + formLastDay[2] + formLastDay[3])
		let lastDayThisMonth;


		var entry;
		let dayColoration;
		let newLine;
		let table			= document.querySelector('#stamping_tbody');	
		
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

				table.appendChild(newLine);
				
				for (let i = 0; i < entry.entries.length; i++)
				{
					newLine = document.createElement('tr');
					
					newLine.classList.add('hidden');
					newLine.classList.add('detailLine');
					
					this._buildDetailLine(newLine, entry.entries[i]);
					table.appendChild(newLine);
				}
				
			}

			currDay = 1;
		}
	}

	_deleteTable()
	{
		let tbody = document.querySelector('#stamping_tbody');	

		let size = tbody.children.length;
		let deleted;

		for (let i = size - 1; i >= 0; i--)
		{
			deleted = tbody.removeChild(tbody.children[i]);
		}	
	}

	constructTable(firstDay, lastDay)
	{
		this.getStamping().then(response => this._constructTable(response, firstDay, lastDay));
	}

	updateTable(firstDay, lastDay)
	{
		this._deleteTable();
		this.constructTable(firstDay, lastDay);
	}

	log()
	{
		this.getStamping().then(response => console.log(response));
	}

}

var stampingPage = document.querySelector('h2').innerHTML === 'Timbrages';

if (stampingPage)
{
	let stamping = new Stamping(url_situation);
	let form;

	document.body.addEventListener('load', setDateAsAttributes('firstDay', firstDayMonth(lastFriday()), ['value']));
	document.body.addEventListener('load', setDateAsAttributes('firstDay', firstDayYear(lastFriday()), ['min']));
	document.body.addEventListener('load', setDateAsAttributes('lastDay', lastFriday(), ['value', 'max']));
		
	form = new FormData(document.querySelector('#form_date'));	
	stamping.constructTable(form.get('firstDay'), form.get('lastDay'));

	document.getElementById("display").addEventListener('click', function (e) {
		e.preventDefault();
		form = new FormData(document.querySelector('#form_date'));	
		stamping.updateTable(form.get('firstDay'), form.get('lastDay'))
	});
}

function unixDateToReadable(date, short = true)
{
	let year = date[0] + date[1] + date[2] + date[3];
	let month = date[5] + date[6];
	let day = date[8] + date[9];

	if (short)
	{
		return day + '.' + month;
	}

	return day + '.' + month + '.' + year;
}

function decimalToHours(time)
{
	let sign = time < 0 ? '-&nbsp;' : '&nbsp;&nbsp;';
	
	if (time === 0)
		return sign + "&nbsp;0:00"

	let hours = Math.abs(time);	
	hours = parseInt(hours, 10);
	hours = hours < 10 ? '&nbsp' + hours : hours;

	let minutes = (time % 1) * 60;
	minutes = Math.abs(minutes);
	minutes = minutes < 10 ? '0' + minutes : minutes;

	return sign + hours + ':' + minutes;
}

function convertUnixDateToSimple(date)
{
	let day = date[8] + date[9];
	let month = date[5] + date[6];

	day = parseInt(day, 10);
	month = parseInt(month, 10);

	return day + "." + month;
}
function convertDateToUnix(date)
{
	let m = date.getMonth() + 1;

	let year = date.getFullYear().toString();
	
	let month = m < 10 ? "0" + m : m;

	let day = date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate().toString();
	
	return year + '-' + month + '-' + day;
}

function firstDayMonth(dateFunction)
{
	let currentDate = (typeof dateFunction === 'undefined') ? new Date() : dateFunction;

	return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
}

function firstDayYear(dateFunction)
{
	let today;

	if (typeof dateFunction === 'undefined')
	{
		today = new Date();
	}
	else
	{
		today = dateFunction;
	}


	return new Date(today.getFullYear(), 0, 1);
}

function lastFriday()
{
	let targetDate = new Date();
	let today = new Date();
	let diff = 0;

	while(targetDate.getDay() != 5 || diff < 3)
	{
		targetDate.setDate(targetDate.getDate() - 1);
		diff = (today - targetDate) / miliSecondsPerDay;
	}

	return targetDate;
}

function today()
{
	return new Date();
}

function tomorrow()
{
	let today = new Date();
	return  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1); 
}

function yesterday()
{
	let today = new Date();

	return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1); 
}

function setDateAsAttributes(element, dateFunction, attributes)
{
	let elmt = document.getElementById(element);
	let date = convertDateToUnix(dateFunction);
	for(let i = 0; i < attributes.length; i++)
	{
		elmt.setAttribute(attributes[i], date);
	}
}





