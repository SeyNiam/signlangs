import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import {LessonsPage} from "./pages/LessonsPage";
import {ForumPage} from "./pages/ForumPage";
import {SettingsPage} from "./pages/SettingsPage";
import {AuthPage} from "./pages/AuthPage";
import {IntroductionPage} from "./pages/IntroductionPage";
import {TestsPage} from "./pages/TestsPage";

export  const useRoutes = isAuthenticated => {
    if(isAuthenticated) {
        return (
            <Switch>
                {/**
                * @swagger
                * path:
                *  /learning/lessons:
                *    get:
                *      tags:
                 *          - user
                */}
                <Route path="/learning/lessons" exact>
                    <LessonsPage/>
                </Route>
                <Route path="/forum" exact>
                    <ForumPage/>
                </Route>
                {/**
                 * @swagger
                 * path:
                 *  /learning/settings:
                 *    get:
                 *      tags:
                 *          - user
                 */}
                <Route path="/settings" exact>
                    <SettingsPage/>
                </Route>
                {/**
                 * @swagger
                 * path:
                 *  /learning/introduction:
                 *    get:
                 *      tags:
                 *          - user
                 */}
                <Route path="/learning/introduction" exact>
                    <IntroductionPage/>
                </Route>
                {/**
                 * @swagger
                 * path:
                 *  /learning/tests:
                 *    get:
                 *      tags:
                 *          - user
                 */}
                <Route path="/learning/tests" exact>
                    <TestsPage/>
                </Route>
                <Redirect to="/learning/introduction"/>
            </Switch>
        );
    }

    return (
        <Switch>
            {/**
             * @swagger
             * path:
             *  /:
             *    get:
             *      tags:
             *          - user
             */}
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
};
