
import React from 'react';
import { renderToString } from 'react-dom/server';
import Client from '../client/app';
const Koa = require('koa');

const app = new Koa();


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
    </body>
  `
})

app.listen(3000)