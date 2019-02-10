import React from 'react';

export const Question = props => {
    //the props being used in this component
    const { columns, rows, onEditLabel, delRow, delCol} = props;
    //first row - the headers of the table.
    const tableHeaders = (
        <thead>
            <tr>
                {/*an empty cell for the A1 position of the table;
                separate row for <delete column> buttons;
                another row for inputs to label the columns;*/}
                <th></th>
                {columns.map((column, index) => (
                    <th key={`${columns.length}-${index}`}><button onClick={()=>delCol(index)}>DEL</button></th>
                ))}
            </tr>
            <tr>
                <th></th>
                {columns.map((column, index) => (
                    <th key={`${columns.length}-${index}`}><input name='columns' index={index} type="text" value={column} onChange={onEditLabel} /></th>
                ))}
            </tr>
        </thead>
    );
    const tableBody = rows.map((row, rowsNumber) => (
        <tr key={`${rowsNumber}-${rows.length}`}>
            {/*first members in row - delete row button and text input to label the row;*/}
            <td className="rowContainer">
                <button className="addRowBtn" onClick={()=>delRow(rowsNumber)}>DEL</button>
                <input className="rowText" name='rows' index={rowsNumber} type="text" value={row} onChange={onEditLabel}/>
            </td>
            {/*filling the table's body with radio buttons, assigning same name to each of the radio that's in the same line to have them in the same*/}
            {columns.map((column, columnNumber) =>(
                <td key={`${columnNumber}-${columns.length}`}>
                    <input type='radio' name={`row${rowsNumber}`} />
                </td>
            ))}
        </tr>
      ));
      
      return (
        <table>
          {tableHeaders}
          <tbody>
            {tableBody}
          </tbody>
        </table>
      );
};
