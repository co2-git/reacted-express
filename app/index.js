'use strict';

import fs                       from 'fs';
import path                     from 'path';
import React                    from 'react';
import ReactDOMServer           from 'react-dom/server';

function inject(file, component, string, props = {}, options = {}) {
  return (req, res, next) => {
    console.log('injecting', component);
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
    return inject(options.inject.into, component, options.inject.where, props);
  }

  return (req, res, next) => {
    const app = React.createFactory(component)(props);
    res.send(React.renderToString(app));
  };
}
