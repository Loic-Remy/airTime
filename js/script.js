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

function get_current_date()
{
	let unixDate;


	return unixDate;
}