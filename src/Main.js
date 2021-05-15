import React from 'react';
import Grid from './Components/Grid';
import './index.css';

class Main extends React.Component {

  constructor() {
    
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 30;
    this.activeRenders = "5"; // how many calls the cell will be active for
    this.reduceBy = 25; // how much to reduce the color value by per render
    this.pickFrame = 5;

    this.state = {
      curFrame: 0,
      grid: Array(this.rows).fill().map(() => Array(this.cols).fill("0,0,0,0")),
    }

  }

  // ==============
  // SQUARE METHODS
  // ==============

  clickSquare = (row, col) => {

    let gridCopy = JSON.parse(JSON.stringify(this.state.grid));

    if (gridCopy[row][col] === "0,0,0,0") {
    
      gridCopy[row][col] = this.makeActive();

      this.setState({
        grid: gridCopy,
      });

    }

  }

  selectColor = () => {
    return 100 + Math.floor(Math.random() * 7) * 25;
  }

  getColor = (colorStr) => {
    var temp = colorStr.split(",");
    for (let i = 0; i < temp.length; i++) {
      temp[i] = parseInt(temp[i], 10);
    }
    return temp;
  }
  
  makeActive = () => {
    return (this.activeRenders + "," +
            String(this.selectColor()) + "," +
            String(this.selectColor()) + "," +
            String(this.selectColor()));
  }

  // should only be called when life > 0
  lowerShade = (colorStr) => {

    var temp = this.getColor(colorStr);
    temp[0] -= 1; // life ticks down 1

    for (let i = 1; i < temp.length; i++) {
      temp[i] = Math.max(0, temp[i] - this.reduceBy);
    }

    temp = String(temp);

    if (temp.substring(0, 1) === "0") {
      temp = "0,0,0,0";
    }

    // kill life earlier if no color values
    else if (temp.substring(1) === ",0,0,0") {
      temp = "0,0,0,0";
    }

    return temp;

}

  // =================
  // COMPONENT METHODS
  // =================

  play = () => {

    let grid_orig = this.state.grid;
    let grid_new = JSON.parse(JSON.stringify(this.state.grid));

    for (let i = 0; i < this.rows; i++) {

      for (let j = 0; j < this.cols; j++) {

        if (grid_orig[i][j].substr(0, this.activeRenders.length) === this.activeRenders) {

          var not_first_col = (j > 0);
          var not_last_col = (j < this.cols - 1);

          if (i > 0) {

            this.checkCell(grid_orig, i, j, grid_new, i - 1, j); // top
            
            if (not_first_col) // top left
              this.checkCell(grid_orig, i, j, grid_new, i - 1, j - 1);

            if (not_last_col) // top right
              this.checkCell(grid_orig, i, j, grid_new, i - 1, j + 1);

          }

          if (i < this.rows - 1) {

            this.checkCell(grid_orig, i, j, grid_new, i + 1, j); // bottom

            if (not_first_col)
              this.checkCell(grid_orig, i, j, grid_new, i + 1, j - 1); // bottom left

            if (not_last_col)
              this.checkCell(grid_orig, i, j, grid_new, i + 1, j + 1); // bottom right

          }

          if (not_first_col)
            this.checkCell(grid_orig, i, j, grid_new, i, j - 1); // left

          if (not_last_col)
            this.checkCell(grid_orig, i, j, grid_new, i, j + 1); // right

        }

        if (grid_orig[i][j].substr(0, 1) !== "0") {
          grid_new[i][j] = this.lowerShade(grid_orig[i][j]);
        }

      }

    }

    this.setState({
      grid: grid_new,
      curFrame: this.state.curFrame + 1,
    });

    // automatically pick square at random
    if (this.state.curFrame === this.pickFrame) {
      this.setState({ curFrame: 0 });

      var picked_row = null;
      var picked_col = null;
      
      while (true) {

        picked_row = Math.floor(Math.random() * this.rows);
        picked_col = Math.floor(Math.random() * this.cols);

        if (this.state.grid[picked_row][picked_col].substr(0, 1) === "0") {
          this.clickSquare(picked_row, picked_col);
          break;
        }

      }

    }

  }

  checkCell = (orig_grid, orig_row, orig_col, new_grid, new_row, new_col) => {
    // compare with new grid to prevent overwrites
    if (new_grid[new_row][new_col].substr(0, 1) === "0")
      new_grid[new_row][new_col] = orig_grid[orig_row][orig_col];
  }

  componentDidMount() {
    this.intervalId = setInterval(this.play, this.speed);
  }

  render() {

    return (
      <div>
        <Grid 
          grid={this.state.grid}
          rows={this.rows}
          cols={this.cols}
          clickSquare={this.clickSquare}
          getColor={this.getColor}
        />
      </div>
    );

  }

}

export default Main;
