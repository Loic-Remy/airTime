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
        const defaultRoutePosition = 1; 

        const routeFound = this.routes.find((route) => route.path === path);

        this.currentRoute = routeFound || this.routes[defaultRoutePosition];

        return this;
    }

    displayView(routePath)
    {

        if (this.currentRoute) {
            this.currentRoute.controller.leaveView();
        }

        this._findRoute(routePath);

        this.currentRoute.controller.displayView();
        console.log(`\n========= DISPLAY NEW PAGE ${location.hash} =========\n\n`)
        
        this._saveCurrentPathInSessionStorage();
    }

    _hasPreviousRoute() {
        return this.previousRoute != null;
    }

    _hasNoPreviousRoute() {
        return this.previousRoute == null;
    }

    _saveCurrentPathInSessionStorage()
    {
        const pagePath = this.currentRoute.path;
        sessionStorage.setItem("currentPath", pagePath);
    }
}