import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

//import Accueil from 'src/containers/Accueil';
//import Search from 'src/containers/Search';
//import Header from 'src/containers/Header';
//import Footer from 'src/components/Footer';
//import Login from 'src/containers/Login';
//import LoginModal from 'src/containers/LoginModal';

//import Team from 'src/components/Team';
import Details from 'src/containers/Details'

//import Registration from 'src/containers/Registration';

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

const App = () => {

    useEffect(() => {
        console.log('render APP')
    })

    return (
        <>
            <UserVerification />
            <ScreenSizeHelper />
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>

                <Route path="/design-system" exact>
                    <DesignSystem />
                </Route>

                <Route path="/connexion" exact>
                    <Login />
                </Route>

                <Route path="/inscription" exact>
                    <Registration />
                </Route>

                <Route path="/search">
                    <Search />
                </Route>

                {/* <Route path="/activity/:id">
                    {isLogged && <Details />}
                    {!isLogged && <Redirect to="/connexion" />}
                </Route> */}

                <Route path="/creation">
                    <CreateActivity />
                </Route>

                <Route path="/equipe">
                    <Team />
                </Route>

                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </>
    )
}

/*
App.propTypes = {
    isLogged: PropTypes.bool.isRequired,
}
*/

export default App
