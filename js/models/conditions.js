"use strict";

class ConditionsManager
{ 
	constructor(url)
	{
		this.url = url;
	}

	async getConditions(workerId, year) 
	{	
		let url = new URL(this.url);

		const firstDay = '1.1';
		const lastDay = '31.12';

		url.searchParams.append('year', year);
		url.searchParams.append('id', workerId);
		url.searchParams.append('from', firstDay);
		url.searchParams.append('to', lastDay);

		let response = await fetch(url);
		return await response.json();
	}

	
}