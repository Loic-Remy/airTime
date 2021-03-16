"use strict";


class Router
{
    currentRoute = null;
    previousRoute = null;

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

    _findRoute(path)
    {
        const defaultRoutePosition = 0; 

        const routeFound = this.routes.find((route) => route.path === path);

        this.previousRoute = this.currentRoute;
        
        this.currentRoute = routeFound || this.routes[defaultRoutePosition];

        return this;
    }

    displayView(routePath)
    {
        this._findRoute(routePath);
        
        if(this.previousRoute) {
            this.previousRoute.controller.leaveView();
        }
        this.currentRoute.controller.displayView();
        
        this._saveCurrentPathInSessionStorage();
    }

    _saveCurrentPathInSessionStorage()
    {
        const pagePath = this.currentRoute.path;
        sessionStorage.setItem("currentPath", pagePath);
    }
}