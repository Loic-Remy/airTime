"use strict";

class viewLogin extends View
{
    constructor(title)
    {
        super(title);

		this.viewId = 'viewLogin';

        this.formHTML = 
            `
            <label for='utilisateur' class='label'>Utilisateur </label>
            <input type='text' id='utilisateur' name='user' placeholder='utilisateur' required autofocus autocomplete>
            <label for='mot de passe' class='label'>Mot de passe </label>
            <input type='password' id='mdp' name='password' placeholder='mot de passe' required autocomplete>
            <input type='submit' id='btnSubmit' name='btnSubmit' value='Valider' class='pointer'>
            `;
    }

    _headerModifier()
    {
        let header = document.createElement('header');
        header.innerHTML = "<h1>airTime</h1>";
        document.querySelector('header').replaceWith(header);
    }

    _headerEvents() {}

    _formModifier()
    {
        let form = document.querySelectorAll('form')[0];
        this.form.id = 'loginForm';
        form.name = 'login';
        form.method = 'post';
    }
}