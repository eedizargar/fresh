const router = require("express").Router();
router.get("/firstPage",(req,res)=>{
    console.log("hit here");
    res.status(200).send();

});
module.exports = router;
