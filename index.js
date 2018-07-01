var numClick = 0;
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
     var latPlace = Math.round(position.coords.latitude);
    var longPlace = Math.round(position.coords.longitude);
    getWeather(latPlace, longPlace);
  });
}

$(document).ready(function() {
  $("#temp").html(temp + " C");
  $("#units").on("click", function() {
    numClick++;
    if (numClick % 2 != 0)
      $("#temp").html(Math.round(temp*(9.0/5)+32) + " F");
    else $("#temp").html(temp + " C");
  });
});

var temp = 0;
function getWeather(latPlace, longPlace){
var apiCall ='https://fcc-weather-api.glitch.me/api/current?lat='+latPlace+'&lon='+longPlace;
var iconCode;
var city = "";
$.getJSON(apiCall, function weatherCallback(weatherData) {
  city = weatherData.name;
  var country = weatherData.sys.country;
  var descr = weatherData.weather[0].description;
  temp = Math.round(weatherData.main.temp);
  var winds = weatherData.wind.speed;
  iconCode = weatherData.weather[0].icon;
  $("#place").html(city + ", " + country);
  $("#temp").html(temp + " C");
  $("#descript").html(descr);
  $("#windspeed").html(winds + " knots");
  $("#icon").html("<img src="+iconCode+">");
  changeBackground(temp);
  });
}

function changeBackground(temp){
  var ftemp = temp*(9.0/5)+32;
  if(ftemp > 75)
   $('body').css('background', 'url("' + "https://www.hdwallpapers.in/walls/beach_resort_sunset-wide.jpg" + '")').css('background-size',"100% 100%");
  else if(ftemp < 40)
    $('body').css('background-image', 'url("' + "http://proshots-2.s3.amazonaws.com/7af73075d02b397bf373ed1c47cb313e8a7ca694bcd1d1bd9abceff5dcb70219/640x480.jpg" + '")').css('background-size',"100% 100%");
}