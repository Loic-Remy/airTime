"use strict";

class FormDatePicker extends HTMLElement
{
    constructor() {
        super();

        this.textContent = `
				<label for='date'>Au</label>
				<input type="date" id="date" name="date" autofocus>
				<input type="submit" value="afficher" id="displaySituation" name="display" class='pointer'>
			`;
    }
}

customElements.define('form-date-picker', FormDatePicker);