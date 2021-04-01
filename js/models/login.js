"use strict";

class LoginManager
{
    typedUser;

	constructor(url)
	{
		this.url = url;
	}

	async getUser(userName)
	{
		var entry;
		var name = userName || this.typedUser;
	/*	
		let encoded = utf8_to_b64(name + ':' + this.typedPassword);
		localStorage.setItem('autorization', encoded);
	*/	
		return await fetch(this.url)
							.then(response => {
								return response.json()
							})
							.then(response => {
								var user = {};
								for (let i = 0; i < response.length; i++)
								{
									entry = response[i];
									
									if (entry.commonName === name)
									{
										user.userName = entry.commonName;
										user.id = entry.id;
										user.pos = i;
										user.passWord = this.typedPassword;

										return user;
									}
								}
								console.log("L'utilisateur n'existe pas");
								new AppStatus("Utilisateur ou mot de passe incorrect", "Echec - ").printAsFailure();
							});
	}

	log(userName)
	{
		this.getUser(userName).then(response => console.log(response));
	}
	
	saveUser(response)
	{
		localStorage.setItem('userId', response.id);
		localStorage.setItem('userName', response.userName);
		localStorage.setItem('pos', response.pos);
	}
}