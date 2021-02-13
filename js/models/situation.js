"use strict";

class SituationManager
{
	constructor(url)
	{
		this.url = url;
	}

	async getSituation(userId, year, firstDay, lastDay)
	{
		let url = new URL(this.url);

		url.searchParams.append('year', year);
		url.searchParams.append('id', userId);
		url.searchParams.append('from', firstDay);
		url.searchParams.append('to', lastDay);

		let response = await fetch(url).then(response => response.json());

		console.log(await response);

		return await response;
	}
}
	
