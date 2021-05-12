import React from 'react';
import Grid from './Components/Grid';
import './index.css';

class Main extends React.Component {

  constructor() {
    
    super();
    this.speed = 50;
    this.rows = 30;
    this.cols = 50;
    this.activeRenders = 10; // how many calls the cell will be active for

    this.state = {
      grid: Array(this.rows).fill().map(() => Array(this.cols).fill(0)),
    }

  }

  // ====================
  // LIFTED STATE METHODS
  // ====================

  selectSquare = (row, col) => {

    let gridCopy = JSON.parse(JSON.stringify(this.state.grid));

    if (gridCopy[row][col] === 0) {
    
      gridCopy[row][col] = this.activeRenders;

      this.setState({
        grid: gridCopy,
      });

    }

  }

  /*
  setColor = () => {

  }

  play = () => {

    let grid_orig = this.state.grid;
    let grid_new = JSON.parse(JSON.stringify(this.state.grid));

    for (let i = 0; i < this.rows; i++) {

      for (let j = 0; j < this.cols; j++) {

        if (i > 0) {
          if (j > 0) {

          }
        }

      }

    }

  }
  */

  render() {

    return (
      <div>
        <Grid 
          grid={this.state.grid}
          rows={this.rows}
          cols={this.cols}
          selectSquare={this.selectSquare}
        />
      </div>
    );

  }

}

export default Main;
