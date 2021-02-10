
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

		let year = '2021';
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
