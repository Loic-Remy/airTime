"use strict";
/*
function utf8_to_b64(str)
{
	return window.btoa(unescape(encodeURIComponent(str)));
}


const _fetch = fetch;

fetch = (url) => {
	let init = {
		headers: {
			'Authorization': `Basic ${locaslStorage.getItem('autorization')}`
		}
	};
	console.log(init);
	
	return _fetch(url, init)
}
*/

String.prototype.translate = function()
{
        let word = this.toLowerCase();
        let reason = dictionary;
        let english= 0;
        let french = 1;
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
            throw new Error(`valeur inconnue: ${word}`);
        }
        else
        {
            return translation;
        }
};

String.prototype.isUnixDate = function()
{
	const unixDatePatern = /^[0-9]{4}[^0-9a-zA-Z][0-1][0-9][^0-9a-zA-Z][0-3][0-9]$/;

	if (unixDatePatern.test(this))
	{
		return true;
	}
	else 
	{
		throw new Error(`"${this}" is not formated as UNIX date`);
	}
};

String.prototype.parseUnixDateString = function()
{
	if (this.isUnixDate())
	{
		let year = this[0] + this[1] + this[2] + this[3];
		let month = this[5] + this[6];
		let day = this[8] + this[9];

		return {
			'year': year,
			'month': month,
			'day' : day
		};
	}
};

String.prototype.unixDateToDDMM = function() {
	const fullDateStr = this.unixDateToDDMMYYYY();	

	return fullDateStr.substring(0, 5);
}

String.prototype.unixDateToDDMMYYYY = function() {
	const date = this.parseUnixDateString();

	return date.day + '.' + date.month + '.' + date.year;
};

String.prototype.unixToSimple = function ()
{
	const date = this.parseUnixDateString();

	const day = parseInt(date.day, 10);
	const month = parseInt(date.month, 10);

		return day + "." + month;
};

Number.prototype.toHoursFormat = function ()
{
	const HTMLspace = '&nbsp;';
	const duration = Math.abs(this);
	
	let hours = Math.trunc(duration);
	let blankSpace = "";

	if (duration < 100)
		blankSpace = HTMLspace;
	if (duration < 10)
		blankSpace = HTMLspace + HTMLspace;

	let minutes = (duration % 1) * 60;
	minutes = Math.round(minutes);

	if (minutes > 59) {
		minutes = '00';
		hours += 1;
	}
	else if (minutes < 10) {
		minutes = '0' + minutes;
	}

	return blankSpace + hours + ':' + minutes;
};

Number.prototype.negativeSign = function()
{
	const HTMLspace = '&nbsp;'
	const minus = '-';

	return this < 0 ? minus + HTMLspace : HTMLspace + HTMLspace;
};

Date.prototype.toUnixFormat = function () 
{
	const year = this.getFullYear().toString();
	const day = this.getDate() < 10 ? "0" + this.getDate().toString() : this.getDate().toString();
	const month = this.getMonth() + 1 < 10 ? `0${this.getMonth() + 1}`: `${this.getMonth() + 1}`;

	return year + '-' + month + '-' + day;
}

Object.prototype.addMultiEventsListener = function (events, handler) 
{
	const elt = this;
	events.forEach(event => elt.addEventListener(event, handler));
};

function displayDetails()
{
	const elem = document.getElementsByClassName("details");
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

	if (array[0].classList.contains("g-hidden") )
	{
		array[0].style.display = "contents";
		array[0].classList.replace("g-hidden", "shown");
	}
	else if (array[0].classList.contains("shown") )
	{
		array[0].style.display = "none";
		array[0].classList.replace("shown", "g-hidden");
	}
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
	let date = dateFunction.toUnixFormat();
	for(let i = 0; i < attributes.length; i++)
	{
		elmt.setAttribute(attributes[i], date);
	}
}