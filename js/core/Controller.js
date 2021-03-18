"use strict";

class Controller
{
    constructor(hash)
    {
        if (hash === undefined)
            throw new Error("missing 'hash' value in constructor");

        this.hash = hash;
    }

    leaveView() {

    }
}
