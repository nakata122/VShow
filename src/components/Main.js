import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './home/Home'
import Exposition from './exposition/Exposition'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/exposition' component={Exposition} />
        </Switch>
    </main>
);

export default Main;