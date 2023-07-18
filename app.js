const express = require('express');
const https = require('https');
const Server = require('http');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req,res) {
    res.sendfile(__dirname + "/index.html") 
});
app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiKey = "fa83d65e311605395700fe1d19c12c88";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageUrl = 'http://openweathermap.org/img/wn/' + icon + "@2x.png";
            const weatherDescription = weatherData.weather[0].description;
            res.write("<h1>The temperature in " + query +  "  is "+ temp+ " degree celsius</h1>");
            res.write("<p>The Weather is currently "+ weatherDescription+ "</p>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        })   
    })   
})

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})