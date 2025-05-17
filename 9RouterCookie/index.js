const express = require("express");
const app = express();

// there can a lots of routes which starts with ... apply. etc can group route them
const shelterRoutes = require("./routes/shelters");
// app.use("/", shelterRoutes);
const adminRoutes = require("./routes/admin")

//fake auth middleware
// app.use((req, res, next)=>{
//     if(req.query.isAdmin){
//         next();
//     }
//     else{
//         res.status(401).send("Access Denied");
//     }
// });
app.use("/shelters", shelterRoutes);  // now its already prefixed with shelters
app.use("/admin", adminRoutes);

app.listen("3000", ()=> {
    console.log("Server is running on port 3000");
})