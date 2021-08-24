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

		let response = await fetch(url).then(response => {
			if (response.ok) {
/*				if (response.lenth > 0) {		*/
					return response.json();
/*				} else {
					throw new Error('No .ini file for this user');
				} */
			} else {
				throw new Error('Can not fetch the situation');
			}
		})
		.catch(error => console.log(error));

		console.log(response);
		return await response;
	}
}

class Situation
{
	constructor({diff}) {
		this.diff = diff;
	}

	getYearBalance() {

	}

	

}