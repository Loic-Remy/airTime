"use strict";


var router = new Router();

window.addEventListener('hashchange', () =>
{
    router.findRoute(location.hash);
    router.callController();
});

window.addEventListener('load', () =>
{
    router.findRoute(location.hash);
    router.callController();
});



location.hash = 'login';

