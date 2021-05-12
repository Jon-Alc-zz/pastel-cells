import React from 'react';
import '../index.css';

class Square extends React.Component {

    constructor() {
        
        super();

        this.state = {
            red: 0,
            blue: 0,
            green: 0,
        }

    }

    selectSquare = () => {
        this.props.selectSquare(this.props.row, this.props.col);
        this.selectColor();
    }

    selectColor = () => {

        this.setState({
            red: Math.floor(Math.random() * 6) * 50,
            green: Math.floor(Math.random() * 6) * 50,
            blue: Math.floor(Math.random() * 6) * 50,
        });

    }

    lowerShade = () => {

        this.setState({
            red: Math.max(0, this.state.red - 25),
            green: Math.max(0, this.state.green - 25),
            blue: Math.max(0, this.state.blue - 25),
        });

    }

    render() {
        return (
            <div
                className="square"
                style={{backgroundColor: `rgb(${this.state.red}, ${this.state.green}, ${this.state.blue})`}}
                onClick={this.selectSquare}
            />
        );
    }

}

export default Square;