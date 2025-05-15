const express = require("express");
const app = express();

// there can a lots of routes which starts with SpeechRecognitionAlternative.apply. etc can group route them
const shelterRoutes = require("./routes/shelters");
// app.use("/", shelterRoutes);
app.use("/shelters", shelterRoutes);  // now its already prefixed with shelters


app.listen("3000", ()=> {
    console.log("Server is running on port 3000");
})