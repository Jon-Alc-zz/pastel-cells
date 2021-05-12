import React from 'react';
import Square from './Square';
import '../index.css';

class Grid extends React.Component {


    render() {

        const width = this.props.cols * 19;
        var rowsArr = [];

        for (var i = 0; i < this.props.rows; i++) {
            for (var j = 0; j < this.props.cols; j++) {

                rowsArr.push(
                    <Square
                        row={i}
                        col={j}
                        key={String(i) + "_" + String(j)}
                        selectSquare={this.props.selectSquare}
                    />
                );

            }
        }

        return (
            <div
                className="grid"
                style={{width: width}}
            >
                {rowsArr}
            </div>
        );
    
    }

}

export default Grid;