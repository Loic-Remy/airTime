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
					situationTableConstruct(data);
		})
	})
}

function fillLine(data, obj, sign)
{
	let cells = document.getElementById(obj).children;

	cells[1].innerHTML = data.summary.hours[obj] == 0 ? "" : sign;
	cells[2].innerHTML = data.summary.hours[obj];
	cells[3].innerHTML = data.summary.days[obj];
}

function fillLineDirect(data, obj, sign)
{
	let cells = document.getElementById(obj).children;

	cells[1].innerHTML = data[obj] == 0 ? "" : sign;
	cells[2].innerHTML = data[obj];
	cells[3].innerHTML = "--";
}

function fillLineEasy(value, obj, sign)
{
	let cells = document.getElementById(obj).children;

	cells[1].innerHTML = (value == 0) ? "" : sign;
	cells[2].innerHTML = value;
	cells[3].innerHTML = "--";
}

function situationTableConstruct(data)
{
	var workToDo = {
		days: 0,
		hours : 0	
	}
	
	let days = data.summary.days;
	let hours = data.summary.hours;

	workToDo.days = days.globalTodo - (days.accident+ days.army + days.health + days.holiday + days.learning + days.unpaid + days.paidunemployed);
	workToDo.hours = hours.globalTodo - (hours.accident + hours.army + hours.health + hours.holiday + hours.learning + hours.unpaid + hours.paidunemployed);

	fillLine(data, "globalTodo", "-");
	fillLine(data, "accident", "+");
	fillLine(data, "health", "+");
	fillLine(data, "learning", "+");
	fillLine(data, "army", "+");
	fillLine(data, "holiday", "+");
	fillLine(data, "unpaid", "+");
	fillLine(data, "paidunemployed", "+");

	fillLineDirect(data, "todo", "-");
	fillLineDirect(data, "done", "+");

	fillLineEasy(data.todo - data.done, "annualDiff", "-");

	fillLine(data, "report", "-");
	fillLine(data, "paid", "-");
	fillLine(data, "manual", "-");

	fillLineEasy(Math.abs(data.diff), "diff", "-");


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

function display_stamping(e)
{
	this.preventDefault();

	get_stamping();
}

document.getElementById("display").addEventListener("click", function (e) {
	e.preventDefault();
	get_stamping();
})

