'use strict';

import express                  from 'express';
import http                     from 'http';
import Server                   from 'express-emitter';
import React                    from 'react';
import renderReact              from '..';

class MyComponent extends React.Component {
  render () {
    return (
      <h1>Hello { this.props.person }</h1>
    );
  }
}

const app = app => app
  .set('port', 7568)
  .get('/test1', renderReact(MyComponent, { person : 'Joe' }))
  .get('/test2', renderReact(MyComponent, { person : 'Jessie' }, {
    inject : {
      into : 'app/test/index.html', where : 'Loading'
    }
  }));

const server = new Server(app)
  .on('listening', () => console.log('server is listening',
    server.app.get('port')
  ));
