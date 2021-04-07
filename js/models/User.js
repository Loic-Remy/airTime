"use strict";

class User
{
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.commonName;
        this.disabled = obj.disabled;
        this.role = obj.role;
    }

    isActive() {
        return this.disabled === true ? false : true;
    }

    isConnected() {
        return this.id === localStorage.getItem('userId');
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

