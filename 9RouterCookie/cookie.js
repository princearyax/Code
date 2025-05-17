const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res)=>{
    res.send("hi");
})

app.get("/cookie", (req, res)=>{
    res.cookie("name", "arya"); //sending this cookie to the client
    res.send("cookie set"); 
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})