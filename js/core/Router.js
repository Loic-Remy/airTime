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
        let result;

        result = this.routes.find((route) => route.path === path);
        console.log(result);
        this.currentRoute = result || this.routes[0];
    }

    callController()
    {
        this.currentRoute.controller.displayView();
    }
}