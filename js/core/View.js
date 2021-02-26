"use strict"

class View
{
	constructor(title = 'Pas de titre')
	{
        this.insertPoint = document.querySelector('main');
 
        this.header = this._createHeader();
        this.h2 = this._createH2(title); 
        this.form = this._createForm();
        this.table = this._createTable();
       
        this.headerHTML = 
        `<div>
            <p id='identity'></p>
            <p id='airtime'>airTime</p>
            <form action='index.html' method='post'>
                <button id='disconnect' type='button' class='pointer'>Déconnexion</button>
            </form>
        </div>
        <div id='menuBox'>
            <p id='menuLabel' class='pointer' onclick='display_or_hide_menu()'>menu</p>
        </div>
        <div>
            <nav>
                <ul id='menu' class='hidden'>
                    <li id='type' class='pointer'>Saisie</li>
                    <li id='situation' class='pointer'>Situation</li>
                    <li id='stamping' class='pointer'>Timbrages</li>
                    <li id='request' class='pointer'>Demandes</li>
                    <li id='conditions' class='pointer'>Conditions</li>
                    <li id='mask' class='hidden'></li>
                </ul>
            </nav>
        </div>`;
    }

    _headerModifier()
    {
        document.getElementById("identity").innerHTML = sessionStorage.getItem('userName');
    } 
 
    _headerEvents()
    {
        document.querySelector('#disconnect').addEventListener('click', function() {
            sessionStorage.clear();
            location.hash = 'login';
        });
    
        document.querySelectorAll('li').forEach(li => li.addEventListener('click', (event) => {
            location.hash = event.target.id;
            })
        );

    }

    _formModifier() {}
    _formEvents() {}

    _tableModifier() {}
    _tableEvents() {}

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

    updateTable(data)
    {
        let newBody = this._buildTableBody(data);

        document.querySelector('table').children[1].replaceWith(newBody);

        this._tableEvents();
    }

    buildPage()
    {
        this.insertPoint.innerHTML = "";

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
    }

}