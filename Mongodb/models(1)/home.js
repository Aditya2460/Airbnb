// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const { log } = require("console");
const db=require('../utils/database')
const Favourites = require("./favourites");

const homeDataPath = path.join(rootDir, "data", "homes.json");
module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description=description;
  }

  save() {   
    if(this.id){
      return db.execute(`UPDATE homes SET houseName=?, price=?, location=?, rating=?, photoUrl=?,description=? WHERE id=? `,[this.houseName,this.price ,this.location,this.rating,this.photoUrl,this.description,this.id]);
    }else{ 
      return db.execute("INSERT INTO homes(houseName, price, location, rating, photoUrl,description) VALUES(?,?,?,?,?,?)",[this.houseName,this.price ,this.location,this.rating,this.photoUrl,this.description]);
  }
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes");

  }

  static findById(id) {
    return db.execute("SELECT * FROM homes WHERE id=?",[id]);
  }
  static deleteById(homeId) {
    return db.execute("DELETE FROM homes WHERE id=?",[homeId]);
  }
};


