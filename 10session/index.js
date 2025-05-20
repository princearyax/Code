const express= require("express");
const app=express();
const session = require("express-session");

app.use(session({
    secret:"thisIsUsedToSign",
    //just two option to be explicit about
    resave: false,
    saveUninitialized: true,
}));

app.get("/", (req, res)=>{
    res.send("hola");
});


//can add anything i want in req.session and that's gonna be saved
//default store is memory store, not good for production
app.get("/c", (req, res)=>{
    if(req.session.count && req.session.count++);
    // if(req.session.count)
    //     req.session.count+=1;
    else req.session.count=1;
    res.send(`you havve view this page    ${req.session.count} times`);
});



app.listen(3000, ()=>{
    console.log("Server running at 3000");
});