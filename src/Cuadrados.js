import React, { Component } from "react";
import "./Cuadrados.css"
export default class Cuadrados extends Component {
  render() {
    return (
      
        <button 
        className="inside" 
        onClick={()=>this.props.change(this.props.position)}
        >
         <div className="turno" ><strong>{this.props.squares[this.props.position]}</strong></div>
        </button>
     
    );
  }
}
