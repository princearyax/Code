const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
app.use(cookieParser());  // to parse incoming cookies

app.get("/", (req, res)=>{
    res.send("hi");
    console.log(req.cookies);
});

app.get("/cookie", (req, res)=>{
    res.cookie("name", "arya"); //sending this cookie to the client
    res.cookie("age","20");
    res.send("cookie set"); 
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});