/*
* mongoose
* docs: https://mongoosejs.com/docs/api.html
*/

var mongoose = require('mongoose');

var Config = require('../config')

mongoose.connect(Config.dbUrl,{useNewUrlParser: true})
mongoose.connection.once('open',()=>{
  console.log('数据库连接成功')
})
mongoose.connection.once('close',()=>{
  console.log('数据库已断开连接')
})

// 创建 Schema
var Schema = mongoose.Schema;
// mongoose.model(ModelName, schema)
// ModelName 即需要映射的集合名


// Document
var catName = new Schema({
  name: String,
  age: Number
})
const Cat = mongoose.model('Cats', catName);
const kitty = new Cat({ name: 'a' , age: 3});
kitty.save().then(() => console.log('successed'));

// console.log(kitty instanceof Cat) // true

// Model
var user = new Schema({
  name: String,
  age: Number,
  gender: {
    type: String,
    default: 'female' // 默认值
  }
})
const P1 = mongoose.model('Users', user);
P1.create({"name": "zhangsan","age": 12,"gender": "boy"}, function (err, res) {
  if (err) console.log(err)
  // console.log(res)
});

P1.insertMany([{"name": "li si","age": 11,"gender": "girl"}], (error,docs) => {
  if(error){
    console.log('error', error)
  }
  // console.log(docs)
})

P1.findOne({"name": "zhangsan"}, (error,docs) => {
  if(error){
    console.log('error', error)
  }

  // console.log(docs instanceof P1) // true

  // docs.age = 23;

  // docs.save()

  docs.updateOne({$set:{"age": 13}}, (err) => {
    docs.save()
    console.log('docs updateOne successed')
  })
  console.log(docs)
})




P1.updateOne({"name": "zhangsan"}, {$set: {'gender': 'a'}}, err => {
  if(err) {
    console.log(err)
  }else{
    console.log('updateOne successed')
  }
})

P1.deleteMany({"age":11}, err => {
  if(err) {
    console.log(err)
  }else{
    console.log('deleteOne successed')
  }
})

