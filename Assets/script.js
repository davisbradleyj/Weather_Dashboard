var city = "San Francisco";
var cities = ["New York", "Boston", "Chicago", "Miami"];
var date = moment().format('MMMM Do YYYY')
var date1 = moment().add(1, 'days').calendar();
var date2 = moment().add(2, 'days').calendar();
var date3 = moment().add(3, 'days').calendar();
var date4 = moment().add(4, 'days').calendar();
var date5 = moment().add(5, 'days').calendar();
var forecast;
var lat;
var long;
var uV;


jQuery.ajaxPrefilter(function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

$("#inputButton").on("click", function (event) {
  event.preventDefault()
  var city = $("#inputCity").val().trim()
  console.log(city)
  // Adding city from the textbox to our array
  cities.push(city);
  // Calling renderButtons which handles the processing of our movie array
  renderCities();


  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=0337ee5c21f2fbff84511550c3460591',
    method: "GET"
  }).then(function (response) {
    console.log(response)
    forecast = response
    console.log(forecast)

  });
})


// Function for displaying cities as a button on the left column
function renderCities() {
  // To prevent repeats, this will delete cities prior to adding cities
  $("#cityButton").empty();
  // Looping through an existing array of cities
  for (var i = 0; i < cities.length; i++) {
    // Then dynamicaly generating buttons for each city in the array
    var newCity = $("<button>");
    // Adding a class of movie-btn to our button
    newCity.addClass("btn btn-block");
    // Add an id to style the button
    newCity.attr("id", "cityBtn");
    // Adding a data-attribute
    newCity.attr("city-name", cities[i]);
    // Providing the initial button text
    newCity.text(cities[i]);
    // Adding the button to the buttons-view div
    $("#cityButton").append(newCity);
  }
}
renderCities()


$("#cityBtn").on("click", function () {
  console.log("clicked")
  city = $(this).text()
  console.log(city)
  currForecast(city)
  futForecast(city)

})

function currForecast() {
  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=0337ee5c21f2fbff84511550c3460591',
    method: "GET"
  }).then(function (response) {
    console.log(response)
    forecast = response
    console.log(forecast)
    $("#city").text(city + " - " + date + " - ICON")
    console.log(city + " " + date)
    $("#cityTemp").text("Temperature: " + ((((forecast.main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    console.log("Temperature: " + ((((forecast.main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#cityHumid").text("Humidity: " + forecast.main.humidity + "%")
    console.log("Humidity: " + forecast.main.humidity + "%")
    $("#cityWind").text("Wind Speed: " + (forecast.wind.speed) + " MPH")
    console.log()
    lat = forecast.coord.lat
    long = forecast.coord.lon
    console.log(lat, long)
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/uvi?appid=0337ee5c21f2fbff84511550c3460591&lat=' + lat + '&lon=' + long,
      method: "GET"
    }).then(function (response) {
      console.log(response)
      uV = response.value
      $("#cityUv").text("UV Index: " + uV)
      console.log(uV)
    })
  })
}

function futForecast() {
  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=0337ee5c21f2fbff84511550c3460591',
    method: "GET"
  }).then(function (response) {
    console.log(response)
    var day = response.list
    $("#day1").text(day[0].dt_txt.split(" ")[0])
    console.log(day[0].dt_txt.split(" ")[0])
    // $("#day1Icon").text(day[0].
    // console.log(day[0].)
    $("#day1Temp").text("Temp: " + ((((day[0].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    console.log("Temp: " + ((((day[0].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#day1Humid").text("Humidity: " + day[0].main.humidity + "%")
    console.log("Humidity: " + day[0].main.humidity + "%")
    $("#day2").text(day[9].dt_txt.split(" ")[0])
    console.log(day[9].dt_txt.split(" ")[0])
    // $("#day1Icon").text(day[0].
    // console.log(day[0].)
    $("#day2Temp").text("Temp: " + ((((day[9].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    console.log("Temp: " + ((((day[9].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#day2Humid").text("Humidity: " + day[9].main.humidity + "%")
    console.log("Humidity: " + day[9].main.humidity + "%")
    $("#day3").text(day[17].dt_txt.split(" ")[0])
    console.log(day[17].dt_txt.split(" ")[0])
    // $("#day1Icon").text(day[0].
    // console.log(day[0].)
    $("#day3Temp").text("Temp: " + ((((day[17].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    console.log("Temp: " + ((((day[17].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#day3Humid").text("Humidity: " + day[17].main.humidity + "%")
    console.log("Humidity: " + day[17].main.humidity + "%")
    $("#day4").text(day[25].dt_txt.split(" ")[0])
    console.log(day[25].dt_txt.split(" ")[0])
    // $("#day1Icon").text(day[0].
    // console.log(day[0].)
    $("#day4Temp").text("Temp: " + ((((day[25].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    console.log("Temp: " + ((((day[25].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#day4Humid").text("Humidity: " + day[25].main.humidity + "%")
    console.log("Humidity: " + day[25].main.humidity + "%")
    $("#day5").text(day[33].dt_txt.split(" ")[0])
    console.log(day[33].dt_txt.split(" ")[0])
    // $("#day1Icon").text(day[0].
    // console.log(day[0].)
    $("#day5Temp").text("Temp: " + ((((day[33].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    console.log("Temp: " + ((((day[33].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#day5Humid").text("Humidity: " + day[33].main.humidity + "%")
    console.log("Humidity: " + day[33].main.humidity + "%")
  })
}

