
const express = require('express');
const routes = require("../fresh/routers");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(('/home'),routes);
const port = 3000;
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});
