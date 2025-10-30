// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const { log } = require("console");
const db = require("../utils/database");
const Favourites = require("./favourites");
const { getDb } = require("../utils/database");
const { ObjectId } = require("mongodb");

const homeDataPath = path.join(rootDir, "data", "homes.json");
module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDb();

    const updateHomes={
      houseName:this.houseName,
      price:this.price,
      location:this.location,
      rating:this.rating,
      photoUrl:this.photoUrl,
      description:this.description,

    }

    if (this._id){
       return db.collection("homes").updateOne({ _id: new ObjectId(String(this._id)) },{$set:updateHomes});
    }
    else{
     return db
      .collection("homes")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      }); 
    }
    
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("homes").find().toArray();
  }

  static findById(id) {
    const db = getDb();
    console.log(id);
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(id)) })
      .next();
  }
  static deleteById(homeId) {
    const db = getDb();
    console.log("home id in delete homes",homeId);
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }
};
