"use strict";


var router = new Router();

window.addEventListener('hashchange', () =>
{
    router.findRoute(location.hash).callController();
    sessionStorage.setItem("currentPage", location.hash);
});

window.addEventListener('load', () =>
{
    router.findRoute(location.hash).callController();
});

if(sessionStorage.getItem("currentPage") === undefined) {
    location.hash = 'login';
} else {
    location.hash = sessionStorage.getItem("currentPage");
}




