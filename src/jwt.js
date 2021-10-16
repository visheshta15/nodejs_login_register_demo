// configure express
const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
// to use partials 
const hbs = require("hbs");
//connecting to db
require("./db/conn")
// Collection
const Register = require("./models/registers");
const { Collection } = require('mongoose');
// want process to automatically generates a port no which app can listen to 
const port = process.env.PORT || 8000;

const htmlPath = path.join(__dirname, '../public')
console.log(htmlPath)
const templatePath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static(htmlPath))
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

app.get("/", (req,res) =>{
    res.render("home")   
})

// app.get("/login", (req,res) =>{
//     res.render("login")
// })
// app.post("/login", async (req,res) =>{
//     try{
//         const emailInput = req.body.email;
//         const passwordInput = req.body.password;
//         const userid = await Register.findOne({email:emailInput});
//         console.log(userid)
//         if (userid){
//             const matchSecurePwd = await bcrypt.compare(passwordInput, userid.password)
//             console.log(matchSecurePwd)
//             // if(userid.password === passwordInput){
//             if(matchSecurePwd){
//                 console.log(userid)
//                 res.status(201).render("welcome")
//             }else{
//                 res.send("invalid credentials1")
//             }
//         }else{
//             res.send("invalid credentials2")
//         }
//     }catch(error){
//         res.status(400).send(error)
//     }
// })

// app.get("/registration", (req,res) =>{
//     res.render("register")
// })


// // create new user 
// app.post("/registration", async (req,res) =>{
//     try{
//         const pwd = req.body.pwd;
//         const confirmpwd = req.body.confirmPwd;
//         if (pwd === confirmpwd){
//             // const sucurePassword = await bcrypt.hash(pwd, 10);
//             const registerEmp = new Register({ 
//                 firstname: req.body.firstName,
//                 lastname: req.body.lastName,
//                 email: req.body.email,
//                 gender: req.body.gender,
//                 phone: req.body.phone,
//                 age: req.body.age,
//                 password: pwd,
//                 confirmpassword: confirmpwd
//             })



//         const register = await registerEmp.save();
//         res.status(201).render("welcome")
//         }else{
//             res.send("password are not matching")
//         }
//     }catch(error){
//         res.status(400).send(error)
//     }
// })

//hasing
// const bcrypt = require('bcrypt');
// const securepwd = async (pwd) =>{
//     const password = await bcrypt.hash(pwd, 10);
//     console.log(password)
//     const pwdmatch = await bcrypt.compare("vish1", password)
//     console.log(pwdmatch)
// }
// securepwd("vish")


//jwt
const jwt = require("jsonwebtoken");
const createToken = async() =>{
    const token = await jwt.sign({_id:"615c52a9d4fcc0ad5cdd1c3c"},"thesecretkeyforjwt", {expiresIn: "5 seconds"})
    console.log("see at jwt.io",token)

    const userVerify = await jwt.verify(token, "thesecretkeyforjwt")
    console.log(userVerify)
}
createToken();


app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`)
})