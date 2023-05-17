const express = require('express');
const response = require ('../interface');
const router = express.Router();
router.post("/signUp",(req,res)=>{
    let {userName,password} = req.body;
    
});