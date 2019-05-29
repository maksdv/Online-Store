import React from 'react';
import Catalogo from './Catalogo.jsx';
import App from './App.jsx';
import Contacto from './components/contacto.jsx';
import { render } from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

render(
    <BrowserRouter>
        <Switch>
            <Route exact path = '/' component = {App} />
            <Route exact path = '/contacto' component={Contacto} />         
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
)