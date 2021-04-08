"use strict";

class User
{
    constructor({id, commonName, disabled, role}) {
        this.id = id;
        this.name = commonName;
        this.disabled = disabled;
        this.role = role;
    }

    isActive() {
        return this.disabled === true ? false : true;
    }

    isConnected() {
        return this.id === localStorage.getItem('userId');
    }
    
    async getSituation(year, firstDay, lastDay) {
	{
		let url = new URL(url_situation);

		url.searchParams.append('year', year);
		url.searchParams.append('id', this.id);
		url.searchParams.append('from', firstDay);
		url.searchParams.append('to', lastDay);

		let response = await fetch(url).then(response => response.json());

		console.log(response);
		return await response;
	}


    }
	
	currentBalance() {
        console.log(this);
		const balance = this.situation.diff;
		return balance.toHours();
	}
}

class UserManager 
{
    constructor(url)
	{
		this.url = url;
	}

	async getUsers() 
	{
		const data = await fetch(this.url)
                            .then(response => response.json())
                            .then(response => response.map(elem => new User(elem)));

		return await data;
	}



    activeOnly(users) {
        return users.map(elem => elem.isActive === true);
    }
}

