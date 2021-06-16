import React, { Component } from "react";
import Cuadrados from "./Cuadrados";
import "./Tablero.css";

export default class Tablero extends Component {
 
   renderizarCuadrados = value=>(
    value.map(val=>(
      <Cuadrados 
      
      value={this.props.cuadrados[val]}
      position={val}
      change={this.props.change}
      state={this.props.state}
      squares={this.props.cuadrados}
      />
    )
    )
  )
  render() {
    return (
      <div className="tablero">
      <div className="row">{this.renderizarCuadrados([0,1,2])}</div>
      <div className="row">{this.renderizarCuadrados([3,4,5])}</div>
      <div className="row">{this.renderizarCuadrados([6,7,8])}</div>
        <p style={{color:"white"}}>{this.props.status}</p>
      </div>
    );
  }
}
