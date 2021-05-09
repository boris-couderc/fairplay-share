import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import ScreenSizeHelper from 'src/components/ScreenSizeHelper'
import UserVerification from 'src/containers/UserVerification'
import HomePage from 'src/containers/HomePage'
import DesignSystem from 'src/views/DesignSystem'
import Team from 'src/views/Team'
import NotFound from 'src/views/NotFound'
import Registration from 'src/containers/Registration'
import Login from 'src/containers/Login'
import Search from 'src/containers/Search'
import CreateActivity from 'src/containers/CreateActivity'
import Activity from 'src/containers/Activity'

const App = () => {
    return (
        <>
            <UserVerification />
            <ScreenSizeHelper />
            <Switch>

                <Route path="/" exact>
                    <HomePage />
                </Route>

                <Route path="/search">
                    <Search />
                </Route>

                <Route path="/activity/:id">
                    <Activity />
                </Route>

                <Route path="/connexion" exact>
                    <Login />
                </Route>

                <Route path="/inscription" exact>
                    <Registration />
                </Route>

                <Route path="/creation" exact>
                    <CreateActivity />
                </Route>

                {/* <Route path="/design-system" exact>
                    <DesignSystem />
                </Route> */}

                <Route path="/equipe" exact>
                    <Team />
                </Route>

                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </>
    )
}

export default App
