const express = require("express");
const https = require("https");
const app = express();


app.get("/",function (req,res) {

    const jp_url = "https://api.openweathermap.org/data/2.5/weather?q=Jaipur&appid=7516370ff6bc0e6814edb8044d80bfea&units=metric";

    https.get(jp_url, function (response) {
        console.log(response.statusCode);

        response.on("data",function (data) {
            var weather_data = JSON.parse(data);
            var temp = weather_data.main.temp;
            var ic = weather_data.weather[0].icon;
            var imgURL = "http://openweathermap.org/img/wn/"+ic+"@2x.png";
            console.log(temp);
            console.log(weather_data.weather[0].description);
            console.log(weather_data);
             res.write("<h1> The temp in Jaipur is " + weather_data.main.temp + "</h1>");
             res.write("<p> The weather description is "+weather_data.weather[0].description+"</p>");
             res.write("<img src="+ imgURL +">");
            res.send();
        });
    });
});


app.listen(3000,function () {
    console.log("Go to port 3000.");
})