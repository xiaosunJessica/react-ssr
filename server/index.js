
import React from 'react';
import { createStore } from 'redux';
import { renderToString } from 'react-dom/server';
import Client from '../client/src/app';
import clientStore from '../client/store';
const Koa = require('koa');
const staticKoa = require('koa-static');
const path = require('path');

const app = new Koa();
const store = createStore(clientStore)

// app.use(async ctx => {
// 	ctx.body = 'hello world'
// })
app
.use(staticKoa(
  path.join(__dirname, '../dist')
))
.use(async ctx => {
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
      <script src="../bundle.js"></script>
    </body>
  `
})

app.listen(3000)