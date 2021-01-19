	let users = new Users(url_users);

	let insertPoint = document.body;
	let h2 = document.createElement('h2');
	h2.innerHTML = 'Utilisateurs';

	let uheader = document.createElement('header');
	uheader.id = 'header';

	let table = document.createElement('table');
	table.id = 'usersTable';

	let thead = document.createElement('thead');
	let tbody = document.createElement('tbody');
	let tfoot = document.createElement('tfoot');

	table.append(thead, tbody, tfoot);


	insertPoint.append(uheader, h2, table);

	var jheader = new Header(url_header);

	jheader.display();

	let body = document.querySelector('body');
	body.addEventListener('load', users.constructTable());