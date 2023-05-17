const mysql = require('mysql');
var connection = mysql.createPool({
    host:"127.0.0.1",
    user:"eedi123",
    password:"password",
    databse:"3306"
})
module.exports = connection;