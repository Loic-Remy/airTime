"use strict";

class ViewDefault extends View
{
    constructor(title)
    {
        super(title);

        this.viewId = 'viewDefault';

        this.formHTML = 
            `<p>Service indisponible.</p>`;
    }
}