const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function (req,res) {

      res.sendFile(__dirname+"/index.html");

});

app.post("/",function (req,res) {
    console.log(req.body.city);


    const query = req.body.city;
    const key = "7516370ff6bc0e6814edb8044d80bfea";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+key+"&units=metric";


    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data",function (data) {
            var weather_data = JSON.parse(data);
            var temp = weather_data.main.temp;
            var ic = weather_data.weather[0].icon;
            var imgURL = "http://openweathermap.org/img/wn/"+ic+"@2x.png";
            console.log(temp);
            console.log(weather_data.weather[0].description);
            console.log(weather_data);
             res.write("<h1> The temp in "+query+" is " + weather_data.main.temp + "</h1>");
             res.write("<p> The weather description is "+weather_data.weather[0].description+"</p>");
             res.write("<img src="+ imgURL +">");
             res.send();
        });
    });

})


app.listen(3000,function () {
    console.log("Go to port 3000.");
})