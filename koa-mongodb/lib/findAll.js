var Koa = require('koa');
var MongoClient = require('mongodb').MongoClient;

var app = new Koa();

var dbUrl = 'mongodb://localhost:27017/';

var dbName ='koa';

MongoClient.connect(dbUrl,{useNewUrlParser: true}, (err, client) =>{
  if(err) {
    console.log('error',err)
    return;
  }

  // 连接数据
  var db = client.db(dbName);

  var res =db.collection('user').find({});

  res.toArray((err,result) => {
    console.log(result);

    client.close();
  })

})
