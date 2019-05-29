import React from 'react';
import Utilidades from '../Utilidades';
import Alert from 'react-s-alert';

class ItemProducto extends React.Component {
    constructor() {
      super();

      var today = new Date();
      const date = today.getFullYear() + '-' +'0'+(today.getMonth() + 1) + '-' + (today.getDate()+3);
		
      this.state = {
        unidadesDisponible : 0,
        unidadesSolicitadas: 0,
        fechaSolicitada: 0,
        date: date,
        textoAmpliado: false,
      }

    }

    render(){
        
        return (
                <div className="itemCont col-xs-12 col-sm-4 col-md-4">
                    <div>
                        <center><h3>{this.props.producto.nombre}</h3></center>
                    </div>
                    <img className="imagen-producto" width="90%" height="300px" src={"../assets/img/"+this.props.producto.imagen} alt=""/>
                    <div>
                       {this.state.textoAmpliado ? 
                       <a id="infoLink"><h3 onClick={this.mostrarTexto.bind(this)}>Ocultar info</h3></a>
                    : <a id="infoLink"><h3 onClick={this.mostrarTexto.bind(this)}>Mostrar info</h3></a> 
                    }
                    </div>
                    
                    <div>
                        <h4>{this.state.textoAmpliado? this.props.producto.descripcion : null}</h4>
                    </div>
                    {this.props.producto.horario ? <div id="precio">
                        <label htmlFor="">Horario:&nbsp;</label><span>{this.props.producto.horario}</span>
                    </div> : null
                    }
                    {this.props.producto.meetingPoint ? 
                    <div id="precio">
                    <label htmlFor="">Meeting Point:&nbsp;</label><span>{this.props.producto.meetingPoint}</span>
                    </div>
                    : null
                    }
                    {
                        this.props.producto.embarque ?
                        <div id="precio">
                            <label htmlFor="">Punto de embarque:&nbsp;</label><span>{this.props.producto.embarque}</span>
                        </div>
                    : null
                    }
                    {
                        this.props.producto.descripcion2 && this.state.textoAmpliado ? 
                        <div>
                            <h4>{this.props.producto.descripcion2}</h4>
                        </div>
                        : null
                    }
                    {
                        this.props.producto.descripcion3 && this.state.textoAmpliado ? 
                        <div>
                            <h4>{this.props.producto.descripcion3}</h4>
                        </div>
                        : null
                    }
                    
                    <div id="precio">
                        <label htmlFor="">Precio:&nbsp;</label><span>{this.props.producto.precio}€</span>
                    </div>
                    <center>
                    <p>Seleccionar fecha* </p>
                    <input id="input" type="date" min={this.state.date} onChange={event => this.setState({fechaSolicitada: event.target.value})}/><br/><br/>
                    <p>Selecionar cantidad*</p>

                    <div>
                        <button className="cantidad" onClick={this.disminuirUnidad.bind(this)} disabled={this.state.unidadesSolicitadas==0}>-</button> 
                        {this.state.unidadesSolicitadas}
                        <button className="cantidad" onClick={this.añadirUnidad.bind(this)}>+</button> 
                    </div>
                    </center>
                    <input id="botonComprar" className="btn btnn" type="button" disabled={this.state.unidadesSolicitadas==0 || this.state.fechaSolicitada == 0} onClick={this.agregarPedido.bind(this)} value="Añadir"></input>
                    
                </div>
        );
    }

    añadirUnidad(){
        const {unidadesSolicitadas}=this.state;
        this.setState({
            unidadesSolicitadas:unidadesSolicitadas+1
        })
    }

    disminuirUnidad(){
        const {unidadesSolicitadas}=this.state;
        this.setState({
            unidadesSolicitadas:unidadesSolicitadas-1
        })
    }

    mostrarTexto(){
        const {textoAmpliado}=this.state;
        this.setState({textoAmpliado:!textoAmpliado})
    }

    agregarPedido(){
        this.props.producto.unidadesDisponibles = this.state.unidadesDisponible;

        this.props.producto.cantidadAComprar = Number.parseInt(this.state.unidadesSolicitadas);
        this.props.producto.fecha=this.state.fechaSolicitada;
        const uuidv1 = require('uuid/v1');

        Utilidades.productosPedidos.length === 0 ? this.props.agregarPedido(uuidv1()) : null;
        
        this.props.agregarPedido(this.props.producto);

        this.setState({
            unidadesSolicitadas: 0
        });

        console.log(Utilidades.productosPedidos)
    }
}
export default ItemProducto;