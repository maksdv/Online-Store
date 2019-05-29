import React from 'react';
import Utilidades from '../Utilidades';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';

class Pedido extends React.Component {
    constructor() {
      super();
		
      this.state = {
         mostrarErrorCorreo: 'ocultar-elemento',
         totalPedido: 0,
         seCanceloPedido: false,
         pedidoPagado: false,
         pedidoString: '',
         stringMail:'',
      }

    }

    componentWillReceiveProps(){
        let totalPedidos=0;
        let string='';
        let stringM='';
        for (var index = 0; index < Utilidades.productosPedidos.length; index++) {
            var element = Utilidades.productosPedidos[index];
            
            totalPedidos += (element.cantidadAComprar * element.precio);
            
            stringM=this.state.stringMail+'Id producto: '+element.id+", Cantidad: "+element.cantidadAComprar+", Fecha: "+element.fecha+'; ';
            string=this.state.pedidoString+','+element.id+","+element.nombre+","+element.cantidadAComprar+","+element.fecha+','+element.cantidadAComprar*element.precio;
        }
        this.setState({
            pedidoString: string,
            totalPedido: totalPedidos,
            stringMail: stringM,
        });
    }
    render(){
        const { seCanceloPedido } = this.state;
        /* if (seCanceloPedido) {
            return (
                <Redirect to="/contacto"/>
            )
        } */
        var articulos = [];

        for (var index = 1; index < Utilidades.productosPedidos.length; index++) {
            var element = Utilidades.productosPedidos[index];
            articulos.push(<li className="media" key={index}>
                <a className="pull-left" href="javascript:;">
                    <img className="media-object imagen-pedidos" src={Utilidades.server+"assets/img/"+element.imagen} />
                </a>
                <div className="media-body">
                    <h4 className="media-heading">{element.nombre}</h4>
                    <label>Unidades:</label>{element.cantidadAComprar}<br/>
                    <label>Precio:</label>${element.precio}<br/>
                    <label>SUBTOTAL:</label>${element.cantidadAComprar*element.precio}<br/>
                </div>
            </li>);
        }
        
        return (
                <div className="cesta panel-pedido-producto panel panel-default">
                    <div className="panel-heading">
                    <span className="panel-title">Carrito</span>
                    </div>
                    <div className="panel-body">
                    <div className="container-info">
                        <div className="lista-pedidos">
                        <ul className="media-list">
                            {Utilidades.productosPedidos.length===0 ?<p>Su carrito está vacío</p> : articulos}
                        </ul>
                        {Utilidades.productosPedidos.length===0 ? null : <label>Su numero de pedido es: {Utilidades.productosPedidos[0]}</label>}
                        </div>
                        {Utilidades.productosPedidos.length===0 ? null : 
                        <div className="total-pedido">
                        <h2>Total: ${this.state.totalPedido}</h2>

                        {<form action="http://localhost/tienda/pedido.php" method="post" name="formulario">
                            <input type="hidden" name="body" value={this.state.pedidoString}></input>
                            <input type="hidden" name="bodyMail" value={this.state.stringMail}></input>
                            <input type="hidden" name="id" value={Utilidades.productosPedidos[0]}></input>
                            

                        </form>
                        }
                    
                        <a onClick={this.cancelarPedidos.bind(this)} className="boton-volver btn btn-default">Cancelar</a>
                        <a onClick={this.pagarPedidos.bind(this)} className="boton-volver btn btn-default boton-pagar">Pagar</a>
                        </div>}
                    </div>
                    </div>
                </div>
        );
    }

    cancelarPedidos(){
        Utilidades.productosPedidos=[];
        this.setState({
            seCanceloPedido: true,
            totalPedido: 0
        });
    }

    pagarPedidos(){
        this.setState({
            pedidoString:Utilidades.productosPedidos[1].id+":"+Utilidades.productosPedidos[1].cantidadAComprar
        }) 
        document.formulario.submit();
    }

    /* pagarPedidos(){
        var dataPost = {
            "var": "foo"
         };
         var dataString = JSON.stringify(dataPost);
         var uurl="localhost/prePedido.php";
         
         $.ajax({
            type: "POST",
			   dataType: "json",
			   url: uurl,
			   data: dataString,
			   success: function(data){
			   }
         });
            
            
       
    }  */
}

export default Pedido;