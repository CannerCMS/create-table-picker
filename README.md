# create-table-picker [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

[![Greenkeeper badge](https://badges.greenkeeper.io/Canner/create-table-picker.svg)](https://greenkeeper.io/)
> Table creater based on [react-hovertable](https://github.com/chilijung/react-hovertable)

## Installation

```sh
$ npm install --save create-table-picker
```

## Usage

Put the React component that you want to trigger the picker to open in `TablePicker`'s children.  `TablePicker` will automatically open when children is `onClick`.

```js
var TablePicker = require('create-table-picker');

function onChange(data) {
  // for example, {rowNumber: 6, columnNumber: 6}
  console.log(data);
}

ReactDOM.render(
  <TablePicker onChange={onChange}>
    <button>click me</button>
  </TablePicker>
, document.getElementById('root'));
```

## Start example server

```
npm start
```

## License

MIT © [Canner](http://github.com/canner)

<a href="https://canner.io">
  <img src="https://user-images.githubusercontent.com/26116324/37811196-a437d930-2e93-11e8-97d8-0653ace2a46d.png"/>
</a>


[npm-image]: https://badge.fury.io/js/create-table-picker.svg
[npm-url]: https://npmjs.org/package/create-table-picker
[travis-image]: https://travis-ci.org/Canner/create-table-picker.svg?branch=master
[travis-url]: https://travis-ci.org/Canner/create-table-picker
[daviddm-image]: https://david-dm.org/Canner/create-table-picker.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Canner/create-table-picker
