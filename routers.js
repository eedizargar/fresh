const router = require("express").Router();
router.get("/firstPage",(req,res)=>{
    console.log("hit here");
    res.status(200).send();

});
router.get("/firstPage1",(req,res)=>{
   console.log("hit 2 here");
    //function will add the info to db
    res.status(200).send("message");

});
module.exports = router;
