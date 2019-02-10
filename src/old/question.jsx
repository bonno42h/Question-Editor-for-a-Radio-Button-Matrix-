import React, { Component } from 'react';
import Radio from './radio';

const Rows = props => (      
  <div>
        <input
          class="mainQuestion"
          type="text"
          placeholder="Title of the question"
        />
        <button onClick={props.addCol}>ADD COL</button>
          <table>
            <div className="colLabel">
              <ColCaption colCount={props.colAmount}/>
            </div>
            {props.rows.map(row => (
              <tr>
                  <td><Radio PROP={row} colCount={props.colAmount}/></td>
              </tr>
              ))}
          </table>
          <button onClick={props.addRow}>ADD ROW</button>
      </div>
  )

export default Rows;