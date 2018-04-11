/* eslint-disable no-console, require-jsdoc */
import React from 'react';
import ReactDOM from 'react-dom';
import TablePicker from '../src';

function onChange(data) {
  console.log(data);
}

ReactDOM.render(
  <div style={{margin: 100}}>
    <TablePicker onChange={onChange}>
      <button>click me</button>
    </TablePicker>
  </div>
, document.getElementById('root'));
