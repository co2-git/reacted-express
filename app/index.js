'use strict';

import fs                       from 'fs';
import path                     from 'path';
import React                    from 'react';
import ReactDOMServer           from 'react-dom/server';

function inject(file, component, string, props = {}, options = {}) {
  return (req, res, next) => {
    try {
      const app = React.createFactory(component)(props);
      const componentToString = ReactDOMServer.renderToString(app);

      let source = '';

      fs
        .createReadStream(file)
        .on('error', next)
        .on('data', data => { source += data.toString() })
        .on('end', () => {
          try {
            source = source.replace(string, componentToString);

            if ( options.inject.props ) {
              source = source.replace(options.inject.props, JSON.stringify(props, null, process.env.NODE_ENV === 'production' ? 0 : 2 ));
            }

            res.send(source);
          }
          catch ( error ) {
            next(error);
          }
        });
    }
    catch ( error ) {
      next(error);
    }
  };
}

export default function render(component, props ={}, options = {}) {
  if ( options.inject ) {
    return inject(options.inject.into, component, options.inject.where, props, options);
  }

  return (req, res, next) => {
    const app = React.createFactory(component)(props);
    res.send(ReactDOMServer.renderToString(app));
  };
}
