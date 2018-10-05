const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))


app.use(async (ctx, next) =>{
  // 配置公共信息
  ctx.state.userinfo = 'zhangsan'

  await next()
})


app.use( async ( ctx ) => {
  let title = 'hello koa2'
  let list = ['ejs','koa']
  let html = '<h4>Html Content</h4>'
  let num = 16;

  await ctx.render('index', {
    title,
    list,
    html,
    num
  })
})

app.listen(3000)
