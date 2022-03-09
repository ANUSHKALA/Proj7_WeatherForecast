const express = require("express");
const https = require("https");
const app = express();


app.get("/",function (req,res) {

    const jp_url = "https://api.openweathermap.org/data/2.5/weather?q=Jaipur&appid=7516370ff6bc0e6814edb8044d80bfea&units=metric";

    https.get(jp_url, function (response) {
        console.log(response);
    });

    res.send("Is this working?");
})


app.listen(3000,function () {
    console.log("Go to port 3000.");
})