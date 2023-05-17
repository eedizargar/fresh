const { query } = require("express");
const pool = require("../pool.js/dbPool");
class DbPoolQueries{
getUser = (name)=>{
    query = 'select * from employees where firstname = ?';
    let queryResponse = pool.query(query,[name]);
        return queryResponse;
}
}
module.exports = new DbPoolQueries();
