import React from 'react';
import Header from './header.jsx';


class Contacto extends React.Component {
    constructor() {
      super();
    }
    
    render(){
        return (
            <div>
                <Header/>
                <h3 id="mensajeEnorab">Enorabuena, su pago se ha realizado con éxito.</h3>
                <div className="panel panel-default container-fuid">
                <div className="panel-heading clearfix">
                <h3 className="panel-title pull-left">Datos de contacto</h3><br/>
                    <label id="labelContact">Nombre*</label>
                    <input className="col-xs-12 col-sm-12 col-md-12 contactoInput"></input><br/>
                    <label id="labelContact">Apellidos*</label>
                    <input className="col-xs-12 col-sm-12 col-md-12 contactoInput"></input><br/>
                    <label id="labelContact">Direcciión de envio*</label>
                    <input className="col-xs-12 col-sm-12 col-md-12 contactoInput"></input><br/>
                    <label id="labelContact">Código postal*</label>
                    <input className="col-xs-12 col-sm-12 col-md-12 contactoInput"></input><br/>
                    <label id="labelContact">País*</label>
                    <input className="col-xs-12 col-sm-12 col-md-12 contactoInput"></input><br/>
                    <label id="labelContact">Código postal*<postal></postal></label>
                    <input className="col-xs-12 col-sm-12 col-md-12 contactoInput" type="text"></input><br/><br/>
                    <label id="labelContact">Tus comentarios</label>
                    <textarea className="col-xs-12 col-sm-12 col-md-12 contactoInput" /><br/><br/>
                    
                    <button id="contactBoton" type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Finalizar</button>
                    
                    </div>
                </div>
            </div>
        );
    }
}

export default Contacto;