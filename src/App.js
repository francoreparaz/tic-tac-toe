import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { Component } from "react";
import Tablero from "./Tablero";
import { Button } from "react-bootstrap";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuadrados: Array(9).fill(null),
      turno: true,
      historial: [],
      stepNumber: 0,
    };
  }
  // toma los pasos jugados
  Pasos(step) {
    this.setState({
      stepNumber: step,
      cuadrados: this.state.cuadrados.slice(0, step),
      turno: step === 0,
    });
    //  console.log(this.state.cuadrados,"step")
  }
  render() {
    //toma el valor de los cuadrado y lo setea en la posición
    const handleChange = (e) => {
      const square = this.state.cuadrados.slice();
      if (square[e] === null) {
        square[e] = this.state.turno ? "X" : "O";
        this.setState({
          cuadrados: square,
          turno: !this.state.turno,
          historial: this.state.historial.concat({
            cuadrados: this.state.cuadrados,
          }),
          stepNumber: this.state.historial.length,
        });
      }
    };

    //Calcula Ganador
    const Ganador = () => {
      const square = this.state.cuadrados;
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (square[a] && square[a] === square[b] && square[b] === square[c]) {
          return square[a];
        }
      }
      return null;
    };

    //ejecuta la funcion del ganador
    const Win = Ganador(this.state.cuadrados);
    let status;
    if (Win) {
      status = alert(`Winner Player ${Win}`);
    } else {
      status = "Player turn " + (this.state.turno ? "X" : "O");
    }

    //crea boton por paso jugado

    const juegos = this.state.historial.map((step, x) => {
      return (
        <li key={x} className="list">
          <Button
            variant="outline-primary"
            onClick={() => {
              this.Pasos(x);
            }}
            style={{ margin: "5px", color: "red" }}
          >
            {`Go to ${x} `}
          </Button>{" "}
        </li>
      );
    });
    return (
      <div className="App">
        <Tablero
          cuadrados={this.state.cuadrados}
          change={handleChange}
          state={this.state.turno}
          status={status}
        />
        <Button
          variant="outline-primary"
          className="boton"
          onClick={() =>
            this.setState({ cuadrados: Array(9).fill(null), historial: [] })
          }
        >
          Start Game
        </Button>{" "}
        <ul>{juegos}</ul>
      </div>
    );
  }
}
