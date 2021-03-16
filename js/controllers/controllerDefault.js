"use strict";

class ControllerDefault extends Controller
{
    constructor(hash)
    {
        super(hash);
        this.view = new ViewDefault('En construction');
    }

    displayView()
    {
        this.view.buildPage();
    }
}