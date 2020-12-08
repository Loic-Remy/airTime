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