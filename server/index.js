
import React from 'react';
import { createStore } from 'redux';
import { renderToString } from 'react-dom/server';
import Client from '../client/src/app';
import clientStore from '../client/store';
const Koa = require('koa');

const app = new Koa();
const store = createStore(clientStore)

// app.use(async ctx => {
// 	ctx.body = 'hello world'
// })
app.use(async ctx =>{
  const htmlMarkup = renderToString(<Client/>)
  ctx.body = `
    <!DOCTYPE html>
    <head>
      <title>server ssr</title>
    </head>
    <body>
      <div id="app">${htmlMarkup}</div>
      <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}
      </script>
    </body>
  `
})

app.listen(3000)