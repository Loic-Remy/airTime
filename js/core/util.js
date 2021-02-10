"use strict";

String.prototype.translate = function()
{
        let word = this.toLowerCase();
        let reason = dictionary;
        let english= 0;
        let french =1;
        let translation = null;
       
        for (let i = 0; i < reason.length; i++)
        {
            if(reason[i][english] === word)
            {
                translation = reason[i][french];
                break;
            }
            else if (reason[i][french] === word)
            {
                translation = reason[i][english];
                break;
            }
        }

        if (translation === null)
        {
            throw new Error("valeur inconnue");
        }
        else
        {
            return translation;
        }
};


String.prototype.unixToSimple = function ()
{
	let day = this[8] + this[9];
	let month = this[5] + this[6];

	day = parseInt(day, 10);
	month = parseInt(month, 10);

	return day + "." + month;
}

Number.prototype.toHoursFormat = function ()
{
    let sign = this < 0 ? '-&nbsp;' : '&nbsp;&nbsp;';
	
	if (this === 0)
		return sign + "&nbsp;0:00"

	let hours = Math.abs(this);	
	hours = parseInt(hours, 10);
	hours = hours < 10 ? '&nbsp' + hours : hours;

	let minutes = (this % 1) * 60;
	minutes = Math.abs(minutes);
	minutes = minutes < 10 ? '0' + minutes : minutes;

	return sign + hours + ':' + minutes;
}

Date.prototype.toUnixFormat = function () 
{
    let m = this.getMonth() + 1;

	let year = this.getFullYear().toString();
	
	let month = m < 10 ? "0" + m : m;

	let day = this.getDate() < 10 ? "0" + this.getDate().toString() : this.getDate().toString();
	
	return year + '-' + month + '-' + day;
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
/*
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
*/
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
	let date = dateFunction.toUnixFormat();
	for(let i = 0; i < attributes.length; i++)
	{
		elmt.setAttribute(attributes[i], date);
	}
}