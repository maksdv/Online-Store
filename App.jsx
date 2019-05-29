import React from 'react';
import { Link } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import Catalogo from './Catalogo.jsx';
import Contacto from './components/contacto.jsx';

class App extends React.Component {
    constructor() {
      super();
		
      this.state = {
         productosPedidos: []
      }

    }
    render() {
        return (
            
            <div>
                <Switch>
                    <Route exact path = '/' component = {Catalogo}/>
                    <Route path = '/contacto' component = {Contacto} />
                </Switch>
            </div>
        );
    }
}

export default App;