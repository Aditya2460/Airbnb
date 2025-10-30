// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const { log } = require("console");
const FavouritesDataPath = path.join(rootDir, "data", "favourites.json");

module.exports = class Favourites {
    static addFavourites(homeId){
        
        this.getFavourites((favourites)=>{
            if(favourites.includes(homeId)){
                console.log("home already in favourites");
                               
            }else{
                favourites.push(homeId);
                fs.writeFile(FavouritesDataPath,JSON.stringify(favourites),(error)=>{
                    console.log("file writing concluded",error);
                })
            }
        })

    }
    static getFavourites(callback){
        fs.readFile(FavouritesDataPath, (err, data) => {
              callback(!err ? JSON.parse(data) : []);
            });
    }
    static deleteById(delhomeId,callback){
     this.getFavourites((homeIds)=>{ 
      
      const homeId=homeIds.filter((homeId)=>delhomeId !== homeId);
      
      fs.writeFile(FavouritesDataPath, JSON.stringify(homeId),callback );
     }); 
    }
};