const Favourites = require("../models/favourites");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([rows])=>{
    res.render("store/index", {
      registeredHomes: rows,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
}).catch((error)=>{
  console.log("error while fetching homes",error);
})
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(([rows])=>{
    res.render("store/home-list", {
      registeredHomes: rows,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
}).catch((error)=>{
  console.log("error while fetching homes",error);
})
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getFavouriteList = (req, res, next) => {
  Favourites.getFavourites((favourites)=>{
    Home.fetchAll().then(([rows])=>{
      const favouriteHomes=rows.filter(home=>
        favourites.includes(home.id))
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    }).catch((error)=>{
      console.log("error while fetching homes",error);
    })
  });
}
exports.gethomedetail=(req, res, next) =>{
  const homeid=req.params.homeid;
  Home.findById(homeid).then(([rows])=>{
    const home=rows[0];
    if(!home){
      res.redirect('/homes');
    }else{ 
    res.render("store/home-detail",{
    home:home,
    pageTitle:"Home-Detail",
    currentPage:"Home",    
  })}  
  }) 
};
exports.postFavouriteslist=(req,res,next)=>{
  const homeId=req.body.homeId;
  Favourites.addFavourites(homeId);
  res.redirect("/favourites")
  
}
exports.postDeleteFavourites=(req,res,next)=>{
  const homeId= req.params.homeId;
  console.log("in storeController",homeId)
  Favourites.deleteById(homeId).then(()=>{
    res.redirect("/favourites");
  }).catch(err=>{
      console.log("error in deleting favourites",err);
    
  })
  
  
}





