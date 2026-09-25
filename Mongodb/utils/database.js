const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;

const mongo_Url = process.env.MONGO_URL;

let _db;

const mongoConnect = (callback) => {
  console.log("Connecting to MongoDB...");

  mongoClient
    .connect(mongo_Url)
    .then((client) => {
      console.log("MongoDB connected successfully");

      _db = client.db("airbnb");

      callback();
    })
    .catch((err) => {
      console.log("Database connection error:", err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("Database not connected");
  }

  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
