const Koa = require('koa');
const Router = require('koa-router'); // koa-router@7.x
const graphqlHTTP = require('koa-graphql');

const schema = require('./schema/schema');
const mongoose = require('mongoose');
// const cors = require('cors');
var config = require('./config/config');

const app = new Koa();
const router = new Router();

// allow cross-origin requests
// app.use(cors());

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect(`mongodb://${config.dbName}:${config.dbPasswd}@ds030827.mlab.com:30827/czh-todo`,{useNewUrlParser: true});

mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

// bind koa with graphql
router.all('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

router.get('/', async (ctx) => {
  let html = `Koa Home`
  ctx.body = html
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
