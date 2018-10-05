var Router = require('koa-router');
var router = new Router();
// var Db = require('./model');

router.get('/', async ctx => {

  // let result = await Db.find('user',{});
  // console.log(result)
  // ctx.body = JSON.stringify(result)
  ctx.body = 'home'

})




module.exports = router;
