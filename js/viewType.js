class TypeView
{
	constructor(title)
	{
        this.insertPoint = document.querySelector('main');
        this.header = this._createHeader();
        this.h2 = this._createH2(title); 
        this.form = this._createForm();
        this.table = this._createTable();

        this._buildHeader(); 
        this._buildForm();

    }

    set header(str)
    {
        if(typeof str != 'string')
            throw new Error('View.header must be setted with an HTML string');

        this.header.createElement('header');
        this.header.innerHTML = str;
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
        let form = document.createElement('form');
        form.name = 'typeForm';
        form.classList.add('multiForm');

        return form;
    }

	_createTable()
	{
		let table = document.createElement('table');
		table.append(document.createElement('thead'));
		table.append(document.createElement('tbody'));
		table.append(document.createElement('tfoot'));
		
		return table;
    }

    _addFormSelect(name, label, optionsArray, optionSelected, ...attributes)
    {
        let elem;
        let option;

        elem = document.createElement('select');
        elem = this._addFormElem(elem, name, label, ...attributes);

        for(let i = 0; i < optionsArray.length; i++)
        {
            option = document.createElement('option');
            option.innerHTML = optionsArray[i];

            if(optionsArray[i] === optionSelected)
                option.setAttribute('selected', '');

            elem.append(option);
        }
        
        return elem;
    }

    _addFormInput(name, label, ...attributes)
    {
        let elem = document.createElement('input');
        this._addFormElem(elem, name, label, ...attributes);

        return elem;
    }

    _addFormElem(elem, name, label = null, ...attributes)
    {
        let newLabel;

        if (label != null)
        {
            newLabel = document.createElement('label');
            newLabel.setAttribute('for', name);
            newLabel.innerHTML = label;
        
            this.form.append(newLabel);
        }

        elem.setAttribute('name', name);

        let current;
        let pos;
        let key;
        let value;
        

        for(let i = 0; i < attributes.length; i++)
        {
            current = attributes[i];
            pos = current.indexOf('=');

            if (pos === -1)
            {
                key = current;
                value = "";
            }
            else {
                key = current.substring(0, pos);
                value = current.substring(pos + 1);
            }
            elem.setAttribute(key, value);
        }

        this.form.append(elem);
        return elem;
    }

    _buildHeader()
    {
        this.header.innerHTML = 
            "<div>\
                <p id='identity'></p>\
                <p id='airtime'>airTime</p>\
                <form action='index.html' method='post'>\
                    <input id='disconnect' class='pointer' type='submit' value='Déconnexion'>\
                </form>\
            </div>\
            <div id='menuBox'>\
                <p id='menuLabel' class='pointer' onclick='display_or_hide_menu()'>Menu</p>\
            </div>\
            <div>\
                <nav>\
                    <ul id='menu' class='hidden'>\
                        <li class='pointer'>Saisie</li>\
                        <li class='pointer'>Situation</li>\
                        <li class='pointer'>Timbrages</li>\
                        <li class='pointer'>Demandes</li>\
                        <li class='pointer'>Conditions</li>\
                    </ul>\
                </nav>\
            </div>";

    }

    _buildForm()
    {
        let elem;

        elem = this._addFormInput('date', 'Date', 'type=date');
        this._addFormInput('begin', 'Début', 'type=time', 'value=07:00', 'required', 'autofocus');
        this._addFormInput('end', 'Fin', 'type=time', 'value=12:00', 'required');
        this._addFormSelect('reason', 'Motif', selectOptions, 'Travail');
        this._addFormInput('remark', 'Remarque', 'type=text');
        this._addFormInput('btnSubmit', null, 'type=submit', 'value=Enregistrer');

        elem.value = convertDateToUnix(today());
    }

	_buildEntryLine(entry, rowElem)
    {
        let cell;

        cell = rowElem.insertCell(0);
        cell.innerHTML = entry.begin.substring(11, 16);

        cell = rowElem.insertCell(1);
        cell.innerHTML = entry.end.substring(11, 16);

        cell = rowElem.insertCell(2);
        cell.innerHTML = entry.reason.translate();
        
        cell = rowElem.insertCell(3);
        cell.innerHTML = entry.type.translate();
        
        cell = rowElem.insertCell(4);
        cell.innerHTML = entry.remark;
    }

    _buildNoEntryLine(rowElem)
    {
        let cell;

        cell = rowElem.insertCell(0);
        cell.setAttribute('colspan', '5');
        cell.innerHTML = 'Aucun timbrage pour cette journée';
    }

    _buildTableHeader(tableHeader)
    {
        let newLine;
        let cell;

        newLine = tableHeader.insertRow(-1); 

        cell = newLine.insertCell(0);
        cell.innerHTML = 'Début';

        cell = newLine.insertCell(1);
        cell.innerHTML = 'Fin';
        
        cell = newLine.insertCell(2);
        cell.innerHTML = 'Motif';
        
        cell = newLine.insertCell(3);
        cell.innerHTML = 'Type';
        
        cell = newLine.insertCell(4);
        cell.innerHTML = 'Remarque';

        return tableHeader;
    }

    _buildTableBody(data, tableBody)
    {
        let newLine;
        let entry;

        if (data.length === 0)
        {
            newLine = tableBody.insertRow(-1);
            this._buildNoEntryLine(newLine);
        }
        else
        {
            for (let i = 0; i < data.length; i++)
            {
                newLine = tableBody.insertRow(-1);
                entry = data[i];
                this._buildEntryLine(entry, newLine);
            }
        }
        return tableBody;
    }

    buildTable(data)
    {
        this._buildTableHeader(this.table.children[0]);
        this._buildTableBody(data, this.table.children[1]);
    }

    updateTable(data)
    {
        let newBody;

        newBody = this._buildTableBody(data, document.createElement('tbody'));

        this.table.children[1].replaceWith(newBody);

    }

    _addEvents()
    {
		document.forms.typeForm.begin.focus();
  
        document.getElementById("identity").innerHTML = sessionStorage.getItem('userName');
        
        document.querySelector('#disconnect').addEventListener('click', function() {
    	    sessionStorage.clear();
        });
        
        document.forms.typeForm.addEventListener('submit', function (event) {
		    event.preventDefault();
            interval.fill(document.forms.typeForm);
           
            intervalManager.sendInterval(interval);

            intervalManager.getIntervals(interval)
                .then(response => view.updateTable(response)); 
        });
		
        document.forms.typeForm.date.addEventListener('blur', function ()
        {
            interval.fill(document.forms.typeForm);
            console.log(interval);
           
            intervalManager.getIntervals(interval)
                .then(response => view.updateTable(response));
        });
    }

	buildPage(...args)
	{
		for (let i = 0; i < args.length; i++)
		{
			this.insertPoint.append(args[i]);
        }
        
        this._addEvents();
    }
    
    transitionToNextView(nextView)
    {
        this.insertPoint.append()
    }
}