"use strict";

class StampingManager 
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
		let worker_id = localStorage.getItem('userId');
		let first_day = '1.1';
		let last_day = document.querySelector('#lastDay').value.unixToSimple();
		
		url.searchParams.append('year', year);
		url.searchParams.append('id', worker_id);
		url.searchParams.append('from', first_day);
		url.searchParams.append('to', last_day);

		let response = await fetch(url);
		response = response.json();
		console.log(response);
		return await response;
    }
}

