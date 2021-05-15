import React from 'react';
import '../index.css';

class Square extends React.Component {

    clickSquare = () => {
        this.props.clickSquare(this.props.row, this.props.col);
    }

    render() {

        return (
            <div
                className="square"
                style={{backgroundColor: `rgb(${this.props.color[1]}, ${this.props.color[2]}, ${this.props.color[3]})`}}
                onClick={this.clickSquare}
            />
        );
    }

}

export default Square;