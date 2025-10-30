const { getDb } = require("../utils/database");

module.exports = class Favourites {
  constructor(homeId) {
    this.homeId = homeId;
  }
  save() {
    const db = getDb();

    return db.collection("favourites").findOne({homeId:this.homeId}).then(existingFavourites=>{
      if(!existingFavourites){
        return db
      .collection("favourites")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      });
      return Promise.resolve();
      }
    })

    
  }
  static getFavourites() {
    const db = getDb();
    return db.collection("favourites").find().toArray();
  }

  static deleteById(delhomeId) {
    const db = getDb();
    console.log("in delete method", delhomeId);
    return db.collection("favourites").deleteOne({ homeId: delhomeId });
  }
};
