const express = require("express");
const router = express.Router();

router.use((req, res, next)=>{
    if(req.query.isAdmin){
        next();
    }
    else{
        res.status(401).send("Access Denied");
    }
});

router.get("/secret", (req, res)=>{
    res.send("This is a secret message");
})


module.exports = router;