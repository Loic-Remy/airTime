"use strict";


const router = new Router();

window.addMultiEventsListener(['hashchange', 'load'], () => {
    router.displayView(location.hash);
    sessionStorage.setItem("currentPage", location.hash);
});


if(sessionStorage.getItem("currentPath") === undefined) {
    location.hash = 'login';
} else {
    location.hash = sessionStorage.getItem("currentPath");
}




