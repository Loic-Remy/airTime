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
				})
			.then(function () {
				document.querySelector('#identity').innerHTML = sessionStorage.getItem('userName');
			});
	}
}

var header = new Header(url_header);

if (document.querySelector('h2').innerHTML != 'connexion')
{
	document.body.addEventListener('load', header.display());
	console.log(sessionStorage.getItem('userName'));
}

var loginPage = document.querySelector('h2').innerHTML === 'connexion';

if (loginPage)
{
	document.querySelector('#submit').addEventListener('click', function (event) {
		sessionStorage.setItem('userId', '4OsUdM6QkP311');
		sessionStorage.setItem('userName', 'Etienne Jordan');
	})

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

		console.log(url);

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

		this.fillLine(data, "globalTodo", "+");
		this.fillLine(data, "accident", "-");
		this.fillLine(data, "health", "-");
		this.fillLine(data, "learning", "-");
		this.fillLine(data, "army", "-");
		this.fillLine(data, "holiday", "-");
		this.fillLine(data, "unpaid", "-");
		this.fillLine(data, "paidunemployed", "-");

		this.fillLineDirect(data, "todo", "+");
		this.fillLineDirect(data, "done", "-");

		this.fillLineEasy(data.todo - data.done, "annualDiff", "+");

		this.fillLine(data, "report", "+");
		this.fillLine(data, "paid", "+");
		this.fillLine(data, "manual", "+");

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




function fetchStamping()
{
	let url = new URL(url_situation);
	let today = new Date();

	let year = toString(today.getFullYear());
	let worker_id = '4OsUdM6QkP311';
	let first_day = new Date(year, 1, 1);
	let last_day = new Date(year, 12, 31);

	first_day = convertDateToUnix(first_day);
	first_day = convertUnixDateToSimple(first_day);

	last_day = convertDateToUnix(last_day);
	last_day = convertUnixDateToSimple(last_day);

	url.searchParams.append('year', year);
	url.searchParams.append('id', worker_id);
	url.searchParams.append('from', first_day);
	url.searchParams.append('to', last_day);


fetch(url)
		.then(response => {
			response.json()
				.then(data => {
					console.log(data);
					situationTableConstruct(data);
		})
	})
}

class Conditions
{
	constructor(url)
	{
		this.url = url;
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
	

function convertUnixDateToSimple(date)
{
	let day = date[8] + date[9];
	let month = date[5] + date[6];

	day = parseInt(day, 10);
	month = parseInt(month, 10);

	console.log(day + "." + month);

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

function stampingTableConstruct(list)
{
	let table = document.getElementById("stamping_tbody");
	
	let month = 1;
	let cell;
	let line;
	
	var entry;

	for (let i = 0; i < list.entries[month].length; i++)
	{
		line = table.insertRow(-1);

		if ( (i + 1) % 2) {
			line.classList.add("odd");
		} else {
			line.classList.add("pair");
		} 

		let entry = list.entries[month][i];
		
		/*col "Jour" */
		cell = line.insertCell(0);
		cell.innerHTML = entry.date;

		/*col "Motif" */	
		cell = line.insertCell(1);
		cell.innerHTML = reasonDesc[entry.reason];

		/*col "Début" */
		cell = line.insertCell(2);
		cell.innerHTML = begin.getHours() + ':' + begin.getMinutes();

		/*col "Fin" */
		cell = line.insertCell(3);
		cell.innerHTML = end.getHours() + ':' + end.getMinutes();
	
		/*col "Remarque" */
		cell = line.insertCell(4);
		cell.innerHTML = entry.remark;
		
		/*col "Durée" */

		/*col "Majoré" */

		/*col "Total" */
	}
}



function get_stamping(func)
{
	let first_day = document.getElementById("firstDay").value + "T00:00:00.000Z";
	let last_day = document.getElementById("lastDay").value + "T00:00:00.000Z"; 
	let worker_id = '4OsUdM6QkP311';
	 

	let url = new URL(url_stamping);
	url.searchParams.append('from', first_day);
	url.searchParams.append('until', last_day);
	url.searchParams.append('target', worker_id);

	console.log(url);

	fetch (url)
		.then(response => {
				response.json()
		.then(data => {
			console.log(data);
			func(data);
		})
		.catch(error => console.log(error));
		})
}
function display_stamping()
{
	this.preventDefault();

	get_stamping();
}

var triggerTarget;

if (triggerTarget = document.getElementById("display"))
{
	triggerTarget.addEventListener("click", function (e) {
	e.preventDefault();
	get_stamping();
	})
}


