
var Koa = require('koa');

var app = new Koa();

var router = require('./router')

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('server port on 3000')
})
