const express = require("express")
const app = express()
const mysql = require("mysql")

require("dotenv").config()
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT
const db = mysql.createPool({
   connectionLimit: 100,
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
})

const port = process.env.PORT
app.listen(port, 
()=> console.log(`Server Started on port ${port}...`))
// const db = mysql.createPool({
//    connectionLimit: 100,
//    host: "127.0.0.1",       //This is your localhost IP
//    user: "newuser",         // "newuser" created in Step 1(e)
//    password: "root",  // password for the new user
//    database: "userdb",      // Database name
//    port: "3306"             // port name, "3306" by default
// })
db.getConnection( (err, connection)=> {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
})


const bcrypt = require("bcrypt")
app.use(express.json())
//middleware to read req.body.<params>
//CREATE USER
app.post("/createUser", async (req,res) => {                    
const user = req.body.name;
const hashedPassword = await bcrypt.hash(req.body.password,10);      //hashing will take time so we put await , and since we need things to carry on we write async in function
//const hashedPassword = req.body.password;

//"async" and "await" are basically "syntactical sugar", or a neater way to write promises in Javascript. 

db.getConnection( async (err, connection) => {
 if (err) throw (err)

//  const sqlSearch = "SELECT * FROM userTable WHERE user = ?"
//  const search_query = mysql.format(sqlSearch,[user])
//  const sqlInsert = "INSERT INTO userTable VALUES (0,?,?)"
//  const insert_query = mysql.format(sqlInsert,[user, hashedPassword])
//  NOTE: Basically the ? will get replaced by the values in the []
 const sqlSearch = "SELECT * FROM userTable WHERE user = ?"
 const search_query = mysql.format(sqlSearch,[user])
 const sqlInsert = "INSERT INTO userTable VALUES (0,?,?)"
 const insert_query = mysql.format(sqlInsert,[user, hashedPassword])
 // ? will be replaced by values
 // ?? will be replaced by string

 //In case we get the connection, we can then QUERY the connection, using connection.query(). Note that since the query() function may take 
 //some time to respond, we use the keyword "await" in front of it. Accordingly we need to include the "async" keyword in front of the 
 //parent function.
 await connection.query (search_query, async (err, result) => {
  if (err) throw (err)
  console.log("------> Search Results")
  console.log(result.length)
  if (result.length != 0) {
   connection.release()
   console.log("------> User already exists")
   res.sendStatus(409) 
  } 
  else {
   await connection.query (insert_query, (err, result)=> {
   connection.release()
   if (err) throw (err)
   console.log ("--------> Created new User")
   console.log(result.insertId)
   res.sendStatus(201)
  })
 }
}) //end of connection.query()
}) //end of db.getConnection()
}) //end of app.post()


//LOGIN (AUTHENTICATE USER)
app.post("/login", (req, res)=> {
    const user = req.body.name
    const password = req.body.password
    db.getConnection ( async (err, connection)=> {
     if (err) throw (err)
     const sqlSearch = "Select * from userTable where user = ?"
     const search_query = mysql.format(sqlSearch,[user])
     await connection.query (search_query, async (err, result) => {
      connection.release()
      
      if (err) throw (err)
      if (result.length == 0) {
       console.log("--------> User does not exist")
       res.sendStatus(404)
      } 
      else {
         const hashedPassword = result[0].password
         //get the hashedPassword from result
        if (await bcrypt.compare(password, hashedPassword)) {
        console.log("---------> Login Successful")
        res.send(`${user} is logged in!`)
        } 
        else {
        console.log("---------> Password Incorrect")
        res.send("Password incorrect!")
        } //end of bcrypt.compare()
      }//end of User exists i.e. results.length==0
     }) //end of connection.query()
    }) //end of db.connection()
    }) //end of app.post()