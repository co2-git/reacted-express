reacted-express
===

Express middleware to render a React component on the back-end.

# Install

```bash
npm install -s reacted-express
```

# Usage

```js
import express from 'express';
import http from 'http';
import React from 'react';
import renderReact from 'reacted-express';

class MyComponent extends React.Component {
  render () {
    return (
      <h1>Hello world</h1>
    );
  }
}

const app = express();

// Will render MyComponent as a HTML view

app.use('/', renderReact(MyComponent));

const server = http.createServer(app);
```

# Inject a React component into a HTML source

Sometimes you want to inject your main component into a HTML source.

```html
<!-- index.html -->
<!doctype html>
<title>Test React App</title>
<!-- This is the section you want to replace -->
<section>Loading</section>
```

```js
import express from 'express';
import http from 'http';
import React from 'react';
import renderReact from 'reacted-express';

class MyComponent extends React.Component {
  render () {
    return (
      <h1>Hello world</h1>
    );
  }
}

const app = express();

// Will render the source of index.html
// ... and replace 'Loading' by the HTML of MyComponent

app.use(renderReact(MyComponent, {}, {
  inject : {
    into : 'index.html',
    where : 'Loading'
  }
}));

const server = http.createServer(app);
```
