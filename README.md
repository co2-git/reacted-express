reacted-express
===

React rendering server-side using Express

# Install

```bash
npm install -s reacted-express
```

# Usage

```js
// Your React component you want to render server-side
// components/app.jsx
import React from 'react';

export default class App extends React.Component {
  render () {
    return (
      <h1>Hello { this.props.person }</h1>
    );
  }
}

// In your express file

// Use reacted express as a middleware in your express file

import renderReact from 'reacted-express';

// ...

app = express();

// Renders App component as a HTML view

app.use('/', renderReact(App, { person : 'Joe' }));

// Voila!

// ...
```

# Inject a React component into a HTML source

Sometimes you want to inject your main component into a HTML source.

```html
<!-- index.html -->
<!doctype html>
<title>Test React App</title>
<!-- This is the section you want to replace -->
<section>Loading</section>
<!-- Where the back-end props are copied -->
<script>window.reactProps = /* props */</script>
```

```js

// ...

app = express();


// Will render the source of index.html
// ... and replace 'Loading' by the HTML of MyComponent

app.use(renderReact(App, { person : 'Jessie' }, {
  inject : {
    into : 'index.html',
    where : 'Loading',
    // where to copy props
    props : '/* props */' // will output { "person" : "Jessie" }
  }
}));

// ...

```

# Pass `props` to client

```js
app.use(renderReact(App, (req, res) => {}, { send : false }));

app.use((req, res, next) => {
  req.reactedExpress.rendered
});
```
