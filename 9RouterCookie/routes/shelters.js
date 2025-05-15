const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Lololololololo");
});
router.get("/shelters", (req, res)=>{
    res.send("All shelters");
});
router.post("/shelters", (req, res)=>{
    res.send("crweate shelters");
});
router.get("/shelters/:id", (req, res)=>{
    res.send("shelter");
});
router.get("/shelters/:id/edit", (req, res)=>{
    res.send("editing");
});

module.exports = router;