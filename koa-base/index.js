const Koa = require('koa');
  const app = new Koa();

  app.use(async ctx => {
    ctx.body = 'Hello World';
  });

  app.listen(3000);

// https://chenshenhai.github.io/koa2-note/note/template/add.html
