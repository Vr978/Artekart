const express =require('express');
const app =express();
const PORT = process.env.PORT || 2804;
const path = require("path");
const mongoose = require("mongoose");
const hbs = require("hbs");
require("./db/conn");
const User = require("./models/userMessage");
const Register = require("./models/register");
// Intialiazing the paths
const staticPath = path.join(__dirname,"../public");
const TemplatePath = path.join(__dirname,"../Templates/views");
const PartialPath = path.join(__dirname,"../Templates/partials");
// Intializing the uses
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(staticPath));
app.set("view engine","hbs");
app.set("views",TemplatePath);
hbs.registerPartials(PartialPath);


app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/aboutus",(req,res)=>{
    res.render("aboutus");
})
app.get("/blog",(req,res)=>{
    res.render("blog");
})
app.get("/cart",(req,res)=>{
    res.render("cart");
})
app.get("/collection",(req,res)=>{
    res.render("collection");
})
app.get("/contact",(req,res)=>{
    res.render("contact");
})


app.post("/contact",async (req,res)=>{
    try {
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error);
    }
})
app.get('/sproduct.hbs', (req, res) => {
    res.render("sproduct.hbs");
  });

 
  
  app.get('/cart1.hbs', (req, res) => {
    res.render("cart1.hbs");
  });
  
app.get("/gifting1",(req,res)=>{
    res.render("gifting1");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/shop1",(req,res)=>{
    res.render("new");
})
app.get("/signup",(req,res)=>{
    res.render("signup");
});
app.post("/register", async (req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;
        if(password === cpassword){
            const registerUser = new Register(req.body);
            await registerUser.save();
            res.status(201).render("signup");
        }else{
            res.send("password not match");
        }
    }
    catch(error){
        res.status(400).send(error);
    }
})
app.post("/login", async (req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await Register.findOne({email});
        if(userEmail.password === password){
            res.status(201).render("index");
        }else{
            res.send("Invalid credits");
        }


    } catch (error) {
        res.status(400).send("Invalid credientials")
    }
})

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})