// http://www.runoob.com/nodejs/nodejs-mongodb.html

var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();

var router = new Router();

var Db = require('./lib/db');

router.get('/', async ctx => {

  let result = await Db.find('user',{});
  // console.log(result)
  ctx.body = JSON.stringify(result)

})

router.get('/add', async ctx => {

  let obj = {
    "username": "zhansan",
    "age":34,
    "sex":"男",
    "status": 1
  }

  let result = await Db.insert('user',obj);
  // console.log(result)

  ctx.body = 'add'
})

router.get('/edit', async ctx => {

  let obj1 = {
    "username": "zhansan"
  }
  let obj2 = {
    "username": "li shuai"
  }

  let result = await Db.update('user',obj1,obj2);
  // console.log(result)

  ctx.body = 'edit'
})

router.get('/del', async ctx => {

  let obj = {
    "username": "li shuai"
  }

  let result = await Db.remove('user',obj);
  // console.log(result)

  ctx.body = 'del'
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('server port on 3000')
})
