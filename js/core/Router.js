"use strict";

class Router
{
    controller;

    routes = [
        {
            path: '#default',
            controller: new ControllerDefault('default') 
        },
        {
            path: '#login',
            controller: new ControllerLogin('login')
        },
        {
            path: '#type',
            controller: new ControllerType('type')
        },
        {
            path: '#stamping',
            controller: new ControllerStamping('stamping')
        },
        {
            path: '#situation',
            controller: new ControllerSituation('situation')
        },
        {
            path: '#conditions',
            controller: new ControllerConditions('conditions')
        }
    ];

    findRoute(path)
    {
        const defaultRoute = 0; 

        const result = this.routes.find((route) => route.path === path);
        
        this.currentRoute = result || this.routes[defaultRoute];

        return this;
    }


    callController()
    {
        this.currentRoute.controller.displayView();
        this._setCurrentPageToSessionStorage();
    }


    _setCurrentPageToSessionStorage()
    {
        const pagePath = this.currentRoute.path;
        sessionStorage.setItem("currentPage", pagePath);
    }
}