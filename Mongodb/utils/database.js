const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;
const mongo_Url ="mongodb+srv://root:root@root.zboa1hy.mongodb.net/?retryWrites=true&w=majority&appName=Root";


  let _db;

const mongoConnect =(callback)=>{
  
      console.log("Entered in the console");
  mongoClient.connect(mongo_Url).then((client) => {
      console.log("Entered in the console");
      _db=client.db("airbnb");
    }).catch((err) => {
      console.log("database connection error");
    });
    callback();
};

const getDb=()=>{
  if(!_db){
    throw new Error("Database not connected");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDb=getDb;