
const express = require('express');
const routes = require("../fresh/routes/index");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/',routes);
const port = 3000;
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});
