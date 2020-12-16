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


function load_users ()
{
	fetch(url_users).then(response => {
	response.json().then(result => {
		result.forEach(element => console.log(element));
		usersTableConstruct(result);
	})
})
}

function usersTableConstruct(list)
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

function load_header()
{
	fetch(url_header)
		.then(response => {
			return response.text()
		})
		.then(data => {
			document.getElementById("header").innerHTML = data;
		});

}

function get_stamping()
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
					stampingTableConstruct(data);
		})
	})
}

function stampingTableConstruct(list)
{
	let table = document.getElementById("stamping_tbody");
	
	let cell;
	let line;  

	let entry;

	for (let i = 0; i < list.length; i++)
	{
		entry = list[i];

		line = table.insertRow(-1);

		if ( (i + 1) % 2) {
			line.classList.add("odd");
		} else {
			line.classList.add("pair");
		} 

		let begin = new Date(entry.begin);
		let end = new Date(entry.end);
		
		/*col "Jour" */
		cell = line.insertCell(0);
		cell.innerHTML = begin.getDate() + '.' + (begin.getMonth() + 1);

		/*col "Motif" */	
		cell = line.insertCell(1);
		cell.innerHTML = entry.reason;

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

function fetchSituation()
{
	let url = new URL(url_situation);

	let year = '2020';
	let worker_id = '4OsUdM6QkP311';
	let first_day = '1.1';
	let last_day = '31.12';

	url.searchParams.append('year', year);
	url.searchParams.append('id', worker_id);
	url.searchParams.append('from', first_day);
	url.searchParams.append('to', last_day);


fetch(url)
		.then(response => {
			response.json()
				.then(data => {
					console.log(data);
		})
	})
}

function convertDateToUnix(date)
{
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

function set_first_day()
{
	let element = document.getElementById("firstDay");

	let today = new Date();
	let formatedDate= today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + '01';

	element.setAttribute("value", formatedDate);
}

function set_last_day()
{
	let element = document.getElementById("lastDay");

	let today = new Date();
	formatedDate = convertDateToUnix(today);

	element.setAttribute("value", formatedDate);
}

function setTodayAsValueAndMax()
{
	let element = document.getElementById("date");

	let today = convertDateToUnix(new Date());

	element.setAttribute("value", today);
	element.setAttribute("max", today);
}

function setTomorrowAsValueAndMin()
{
	let element = document.getElementById("date");

	let today = new Date();

	let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1); 

	tomorrow = convertDateToUnix(tomorrow);

	element.setAttribute("value", tomorrow);
	element.setAttribute("min", tomorrow);

}