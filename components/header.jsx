import React from 'react';

class Header extends React.Component {
    constructor() {
      super();
		
      this.state = {
         mostrarErrorCorreo: 'ocultar-elemento',
         mostrarErrorContrasena: 'ocultar-elemento',
         mostrarErrorForm: 'ocultar-elemento',
         msnErrorForm: 'Error desconocido'
      }

    }

    render(){
        return (
            <nav className="barra-navegacion navbar navbar-default" role="navigation" id="portada">
                <div id="portadaText" className="navbar-header">
                    <h3>Tienda QHM</h3>
                </div>
            </nav>
        );
    }
}

export default Header;