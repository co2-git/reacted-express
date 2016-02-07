'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = render;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDomServer = require('react-dom/server');

var _reactDomServer2 = _interopRequireDefault(_reactDomServer);

function inject(file, component, string) {
  var props = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
  var options = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];

  console.log('injecting', { file: file, component: component, string: string, props: props, options: options });
  return function (req, res, next) {
    try {
      (function () {
        var app = _react2['default'].createFactory(component)(props);
        var componentToString = _reactDomServer2['default'].renderToString(app);

        var source = '';

        _fs2['default'].createReadStream(file).on('error', next).on('data', function (data) {
          source += data.toString();
        }).on('end', function () {
          try {
            source = source.replace(string, componentToString);

            if (options.inject.props) {
              source = source.replace(options.inject.props, JSON.stringify(props, null, process.env.NODE_ENV === 'production' ? 0 : 2));
            }

            res.send(source);
          } catch (error) {
            next(error);
          }
        });
      })();
    } catch (error) {
      next(error);
    }
  };
}

function render(component) {
  var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  if (options.inject) {
    return inject(options.inject.into, component, options.inject.where, props, options);
  }

  return function (req, res, next) {
    var app = _react2['default'].createFactory(component)(props);
    res.send(_react2['default'].renderToString(app));
  };
}

module.exports = exports['default'];