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

  var obj =  {
    'username':'xiao chen',
    'age':22,
    'sex':'男',
    'status': 1
  };

  db.collection('user').insertOne(obj, function(error, result){
    if(error){
      console.log('insertOne Error: ',error);
      return;
    }
    console.log('insertOne Successed!');
    client.close();
  })
})
