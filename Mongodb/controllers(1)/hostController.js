const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing:false,
  });
};
exports.getEditHome = (req, res, next) => {
  const homeId=req.params.homeId;
  const editing=req.query.editing;
  Home.findById(homeId).then(([rows])=>{
    if(!rows){
      console.log("home not found");
      res.redirect("/host/host-home-list")
    } 
    res.render("host/edit-home", {
      home:rows,
      editing:editing,
    pageTitle: "editing Home",
    currentPage: "host-homes",
    
  })
  
  }).catch((error)=>{
    console.log("error in editing home",error);
    
  })
};


exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(([rows])=>{
    res.render("host/host-home-list", {
      registeredHomes: rows,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
}).catch((error)=>{
  console.log("error while fetching homes",error);
})
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description} = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl, description);
  home.save().then(()=>{
     res.render("host/home-added", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
  });
  }).catch((error)=>{
    console.log("error while saving home",error);    
  })

 
};
exports.postEditHome= (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl, description } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl, description);
  home.id=id;
  home.save().then(()=>{
     res.redirect("/host/host-home-list");
  }).catch((error)=>{
    console.log("Error while edition home",error);
  })
 
};
exports.deleteHome= (req, res, next) => {
  const homeId=req.params.homeId;
  Home.deleteById(homeId).then(()=>{
    res.redirect("/host/host-home-list");
  }).catch((error)=>{
      console.log("Error Deleting home",error);    
  
  })
  
};