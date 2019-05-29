import React from "react";
import * as request from "superagent";
import Header from "./components/header.jsx";
import ItemProducto from "./components/ItemProducto.jsx";
import Pedido from "./components/Pedido.jsx";
import Utilidades from "./Utilidades";

class Catalogo extends React.Component {
  constructor() {
    super();

    this.state = {
      productos: [],
      productosConsulta: [],
      patronBusqueda: "",
      productosPedidos: [],
      mostrar: false,
    };   
  }

  componentDidMount(){
    this.getTours();
  }

  render() {

    const { mostrar }=this.state;
    mostrar ? this.getProductos() : null
    var articulos = [];
    var productos = this.state.productosConsulta;
    for (var i = 0; i < productos.length; i++) {
      let producto = productos[i];
      articulos.push(
        <div className="item-producto" key={i}>
          <ItemProducto
            agregarPedido={this.agregarPedido.bind(this)}
            producto={producto}
            productosPedidos={this.state.productosPedidos}
          />
        </div>
      );
    }
    return (
      <div className="container-catalogo-productos">
        <Header cantidadPedidos={Utilidades.productosPedidos.length} />
        <div className="panel-catalogo-productos panel panel-default">
          <div className="panel-heading">
            <div className="formulario-buscador">
              <label id="labelBuscador" htmlFor="buscador">¿Que estas buscando?</label>
              <input
                type="text"
                value={this.state.patronBusqueda}
                onChange={this.busquedaProductos.bind(this)}
              />
            </div>
          </div>
          <div className="panel-body">
          <div className="botones-mostrar col-xs-12 col-sm-12 col-md-12">
            <input className="btn btnn boton-principal" type="button" onClick={() => this.handleTour()} value="Actividades Díarias"></input>
            <input className="btn btnn boton-principal" type="button"  onClick={() => this.handlePack()} value="Packs Actividades"></input>
          </div>
          {articulos}</div>
        </div>
        <Pedido/>
      </div>
    );
  }

    handleTour(){
      this.getTours();
    }

    handlePack(){
      this.getPacks();
    }

  /**
   * Se agrega los productos como pedidos.
   * @param {*} producto
   */
  agregarPedido(producto) {

    let indexPedido = -1;
    for (var index = 0; index < Utilidades.productosPedidos.length; index++) {
      var element = Utilidades.productosPedidos[index];
      if (element.id === producto.id) {
        indexPedido = index;
        break;
      }
    }
    if (indexPedido != -1) {
      Utilidades.productosPedidos[indexPedido].cantidadAComprar +=
        producto.cantidadAComprar;
    } else {
      Utilidades.productosPedidos.push(producto);
    }
    this.setState({
      productosPedidos: Utilidades.productosPedidosAux
    });
    
    console.log(Utilidades.productosPedidosAux)
  }
  /**
   * Metodo ejecutado en el onChange del campo de consulta. Consulta los productos relacionados con el patron.
   * @param {*} event
   */
  busquedaProductos(event) {
    let patronEscrito = event.target.value;
    this.setState({ patronBusqueda: event.target.value });
    let productos = this.state.productos;
    let productosConsulta = [];
    for (var index = 0; index < productos.length; index++) {
      var element = productos[index];
      if (element.nombre.toLowerCase().includes(patronEscrito.toLowerCase())) {
        productosConsulta.push(element);
      }
    }
    this.setState({ productosConsulta: productosConsulta });
  }
  /**
   * Consultar los productos existentes
   */
  
  getTours() {
    request
      .get("./datos/catalogTours.json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        let productosRecuperados = res.body;
        request
          .get("./datos/catalogTours.json")
          .set("Content-Type", "./datos/application/json")
          .end((errPedido, resPedido) => {
            let pedidosRecuperados = resPedido.body;
            for (var index = 0; index < productosRecuperados.length; index++) {
              var element = productosRecuperados[index];
              for (
                var indexUtil = 0;
                indexUtil < Utilidades.productosPedidos.length;
                indexUtil++
              ) {
                var elementUtil = Utilidades.productosPedidos[indexUtil];
                if (element.id == elementUtil.id) {
                  productosRecuperados[index].unidadesDisponibles -=
                    elementUtil.cantidadAComprar;
                }
              }
              for (let key in pedidosRecuperados) {
                var pedido = pedidosRecuperados[key];
                if (element.id == pedido.id) {
                  productosRecuperados[index].unidadesDisponibles -=
                    pedido.cantidadAComprar;
                }
              }
            }
            this.setState({
              productos: productosRecuperados,
              productosConsulta: productosRecuperados
            });
          });
      });
  }

  getPacks() {
    request
      .get("./datos/packs.json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        let productosRecuperados = res.body;
        request
          .get("./datos/packs.json")
          .set("Content-Type", "./datos/application/json")
          .end((errPedido, resPedido) => {
            let pedidosRecuperados = resPedido.body;
            for (var index = 0; index < productosRecuperados.length; index++) {
              var element = productosRecuperados[index];
              for (
                var indexUtil = 0;
                indexUtil < Utilidades.productosPedidos.length;
                indexUtil++
              ) {
                var elementUtil = Utilidades.productosPedidos[indexUtil];
                if (element.id == elementUtil.id) {
                  productosRecuperados[index].unidadesDisponibles -=
                    elementUtil.cantidadAComprar;
                }
              }
              for (let key in pedidosRecuperados) {
                var pedido = pedidosRecuperados[key];
                if (element.id == pedido.id) {
                  productosRecuperados[index].unidadesDisponibles -=
                    pedido.cantidadAComprar;
                }
              }
            }
            this.setState({
              productos: productosRecuperados,
              productosConsulta: productosRecuperados
            });
          });
      });
  }
}

export default Catalogo;
