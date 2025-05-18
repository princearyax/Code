const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
app.use(cookieParser("aryax"));  // to parse incoming cookies //that string will be used as secret to sign and erify

app.get("/", (req, res)=>{
    res.send("hi");
    console.log(req.cookies);
});

app.get("/cookie", (req, res)=>{
    res.cookie("name", "arya"); //sending this cookie to the client
    res.cookie("age","20");
    res.send("cookie set"); 
});

app.get("/getsignedcookie", (req, res)=>{
    res.cookie("name", "arya", {signed: true}); // sending this cookie to the
    res.send("sending signed cookie");
})

app.get("/verifycookie", (req, res)=>{
    // res.send(req.cookies); 
    res.send(req.signedCookies);

});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});