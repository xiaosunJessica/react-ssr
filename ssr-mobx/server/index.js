

import React from 'react';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import Client from '../client/src/app';
import RootStore from '../client/store';
import serialize from 'serialize-javascript';
const Koa = require('koa');
const staticKoa = require('koa-static');
const path = require('path');

const app = new Koa();
const store = new RootStore();
console.info({...store}, '------')

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
      window.__INITIAL_STATE__ = ${JSON.stringify({...store})}}
      </script>
      <script src="../bundle.js"></script>
    </body>
  `
})

app.listen(3000, () => {
	console.info('http://localhost:3000')
})