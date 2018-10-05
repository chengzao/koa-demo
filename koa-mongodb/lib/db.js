var MongoClient = require('mongodb').MongoClient;

var Config = require('../config')

class Db {
  // 单例
  static getInstance() {
    if (!Db.instance) {
      console.log('Db.instance')
      Db.instance = new Db()
    }
    return Db.instance;
  }

  constructor() {
    this.dbClient = '';
  }
  // 连接
  connect() {
    var that = this;
    return new Promise((resolve, reject) => {
      //
      if (!that.dbClient) {
        MongoClient.connect(Config.dbUrl, {
          useNewUrlParser: true
        }, (error, client) => {
          if (error) {
            // console.log('mongodb connect error: ',error)
            reject(error)
          } else {
            // console.log('mongodb connect successed')
            that.dbClient = client.db(Config.dbName);
            resolve(that.dbClient);
          }
        })
      } else {
         resolve(that.dbClient);
      }
    })
  }

  // 查找
  find(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        var result = db.collection(collectionName).find(json);
        result.toArray((error, docs) => {
          if (error) {
            reject(error)
          } else {
            resolve(docs)
          }
        })
      })
    })
  }
  // 更新
  update(collectionName,json1,json2) {
    return new Promise( (resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).updateOne(json1, {$set: json2}, (error, result)=>{
          if(error){
            reject(error)
          }else{
            resolve(result)
          }
        })
      })
    })
  }
  // 插入
  insert(collectionName,json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).insertOne(json, (error, result)=> {
          if(error){
            reject(error);
          }else{
            resolve(result);
          }
        })
      })
    })
  }

  // 删除
  remove(collectionName,json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).removeOne(json, (error, result)=> {
          if(error){
            reject(error);
          }else{
            resolve(result);
          }
        })
      })
    })
  }


}

module.exports = Db.getInstance();
