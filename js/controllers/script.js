
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
