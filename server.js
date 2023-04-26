const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
// const passport = require('passport')

const users = [];

app.set('view-engine','ejs')
app.use(express.urlencoded({ extended: false }))        // to use forms from register/login links as res values


app.get('/',(req,res)=>{
    res.render('index.ejs',{name : 'Ajitesh'})
})

app.get('/login',(req,res)=>{
    res.render('login.ejs',{name : 'Ajitesh'})
})
app.post('/login',(req,res)=>{

})


app.get('/register',(req,res)=>{
    res.render('register.ejs')
})
app.post('/register',async (req,res)=>{
    try{    
        const hashedPassword = await bcrypt.hash(req.body.password,10)  //await for the async to be done, hash the value from forms body/password and hash it 10 times
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

app.listen(3000);