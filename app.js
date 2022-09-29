const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");
const _ = require("lodash")
const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

var cityName = "";
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const dateModule= new Date()


app.get("/",function(req,res){
res.render("home");
})

app.post("/",function(req,res){
  cityName = _.upperFirst(req.body.cityName);
  console.log(cityName);
  res.redirect("/weather")
});



app.get("/weather",function(req,res){
  const url= "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=a799262b1b4eb2433fc650f458d45ba7";
  console.log(url);
  https.get(url,function(response){
    // console.log(response)
    response.on("data",function(data){
      const weatherData=JSON.parse(data)
      const temp = weatherData.main.temp;
      const desciption =_.upperFirst( weatherData.weather[0].description);
      const humid = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;
      const feelsLike = weatherData.main.feels_like;
      const minTemp = weatherData.main.temp_min;
      const maxTemp = weatherData.main.temp_max;
      countryName=weatherData.sys.country;
      icon =weatherData.weather[0].icon;
      const day = days[dateModule.getDay()];
      const month = months[dateModule.getMonth()];
      const date = dateModule.getDate();
      const year = dateModule.getFullYear();
      console.log(desciption);
      res.render("weather",{
        name:cityName,
        country:countryName,
        imgIcon:icon,
        temperature:temp,
        weatherDescription:desciption,
        humidity : humid,
        windSpeedHour: windSpeed,
        getDay : day,
        getmonth : month,
        gateDate : date,
        getYear : year,
        heigheastTemp : maxTemp,
        lowestTemp : minTemp,
        tempFeels : feelsLike
      });
    })
  })



})
app.post("/",function(req,res){
  res.redirect("/");
})
app.listen(3000,function(){
  console.log("your server is running on this port");
})



// https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=a799262b1b4eb2433fc650f458d45ba7
//
