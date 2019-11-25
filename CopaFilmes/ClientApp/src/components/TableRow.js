import React, { Component } from "react";
import "./TableRow.css";

class TableRow extends React.Component{
    static defaultProps = {
        selected: false,
        
    }

    render() {
        const { selected,disabled,id,titulo,ano,handleSelect } = this.props;

        //console.log(`render TableRow :: ${titulo} :: ${ano}`);

        return (
            <tr>
                <td>
                    <input
                        name={id}
                        type="checkbox"
                        checked={selected}
                        disabled={disabled}
                        onChange={handleSelect}
                    />
                </td>
                <td>{titulo}</td>
                <td>{ano}</td>
            </tr>
        );
    }


}
export default TableRow;




