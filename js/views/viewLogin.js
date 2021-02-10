"use strict";

class viewLogin extends View
{
    constructor(title)
    {
        super(title);

        this.formHTML = 
                `<label for='utilisateur' class='loginLabel'>Utilisateur </label>
                <input type='text' id='utilisateur' name='user' placeholder='utilisateur' required autofocus autocomplete>
                <label for='mot de passe' class='loginLabel'>Mot de passe </label>
                <input type='password' id='mdp' name='password' placeholder='mot de passe' required autocomplete>
                <input type='submit' id='btnSubmit' name='btnSubmit' value='Valider'>`;
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
        form.classList.add('loginForm');
        form.name = 'login';
        form.method = 'post';
    }
}