"use strict"

class View
{
	constructor(title = 'Pas de titre')
	{
        this.insertPoint = document.querySelector('main');
        console.log(this.viewId);
 
        this.header = this._createHeader();
        this.h2 = this._createH2(title); 
        this.form = this._createForm();
        this.table = this._createTable();
        this.statusBar = this._createStatusBar();
       
        this.headerHTML = 
        `<div>
            <p class='identity'></p>
            <p class='airtime'>airTime</p>
            <form action='index.html' method='post'>
                <button type='button' class='g-pointer disconnect'>Déconnexion</button>
            </form>
        </div>
        <div class='menuContainer'>
            <p class='menuLabel g-pointer'>menu</p>
        </div>
        <div>
            <nav>
                <ul class='menuList g-hidden'>
                    <li id='type' class='g-pointer'>Saisie</li>
                    <li id='situation' class='g-pointer'>Situation</li>
                    <li id='stamping' class='g-pointer'>Timbrages</li>
                    <li id='conditions' class='g-pointer'>Conditions</li>
                    <li id='users' class='g-pointer'>Utilisateurs</li>
                    <li id='request' class='g-hidden g-pointer'>Demandes</li>
                    <li id='mask' class='g-hidden'></li>
                </ul>
            </nav>
        </div>`;

        this.statusBarHTML = 
        `
        <p class="msgBox"></p>
        `;
    }

    _headerModifier()
    {
        document.querySelector(".identity").innerHTML = localStorage.getItem('userName');
    } 
 
    _headerEvents()
    {
        document.querySelector('.disconnect').addEventListener('click', this._clearSessionStorage);
        document.querySelector('.disconnect').addEventListener('click', this._navigateToLoginPage);
    
        document.querySelector('.menuLabel').addEventListener('click', this._displayOrHideMenu);
        document.addEventListener('click', this._hideMenu);

        document.querySelectorAll('li').forEach(li => li.addEventListener('click', this._navigateToPage));
    }

    _clearSessionStorage() {
        localStorage.clear();
    }

    _navigateToLoginPage() {
        location.hash = 'login';
    }
    
    _displayOrHideMenu(e) {
        const menu = document.querySelector(".menuList");
        
        if (menu.classList.contains("g-hidden") ) {
            menu.classList.remove("g-hidden");
        } 
        else {
            menu.classList.add("g-hidden");
        }
        e.stopPropagation();
    }
    
    _hideMenu(e) {
        const menu = document.querySelector(".menuList");

        if(menu === null) {
            return;
        }
        
        if(e.target.nodeName != 'LI' && menu.classList.contains("g-hidden") === false) {
            menu.classList.add("g-hidden");
        }
    }

    _navigateToPage(e) {
        location.hash = e.target.id;
    }


    _formModifier() {}
    _formEvents() {}

    _tableModifier() {}
    _tableEvents() {}

    _statusBarModifier() {
    }

    _statusBarEvents() {
        const bar = document.querySelector('#statusBar');

        bar.addEventListener('click', (event) => {
            if(event.currentTarget.nodeName === 'DIV') {
                if(event.currentTarget.classList.contains("g-hidden") === false) {
                    event.currentTarget.classList.add("g-hidden");
                }
            }
            event.stopPropagation();
        });



    }

    _createHeader()
    {
        let header = document.createElement('header');

        return header;
    }

    _createH2(title)
	{
		let h2 = document.createElement('h2');
		h2.innerHTML = title;

        return h2;
    }

    _createForm()
    {
        let form =  document.createElement('form');
        
        return form;
    }

    _createTable()
	{
        let table = document.createElement('table');
		
		return table;
    }

    _createStatusBar() {
        let bar = document.createElement('div');
        bar.id = 'statusBar';
        bar.classList.add("disparition", "g-hidden");

        return bar;
    }

    updateTable(data)
    {
        let newBody = this._buildTableBody(data);

        document.querySelector('table').children[1].replaceWith(newBody);

        this._tableEvents();
    }

    buildPage()
    {
        this.insertPoint.innerHTML = "";
        this.insertPoint.id = this.viewId;


        if(this.header != null)
        {
            this.header.innerHTML = this.headerHTML;
            this.insertPoint.append(this.header);
            this._headerModifier();
            this._headerEvents();
        }

        this.insertPoint.append(this.h2);
         
        if(this.formHTML != undefined){
            this.form.innerHTML = this.formHTML;
            this.insertPoint.append(this.form);
            this._formModifier();
            this._formEvents();
        }

        if(this.tableHTML != undefined)
        {
            this.table.innerHTML = this.tableHTML;
            this.insertPoint.append(this.table);
            this._tableModifier();
            this._formEvents();
        }

        if(this.statusBar != undefined) {
            this.statusBar.innerHTML = this.statusBarHTML;
            this.insertPoint.append(this.statusBar);
            this._statusBarEvents();
        }
    }

}