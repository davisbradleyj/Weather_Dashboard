// set global variables
var cities = JSON.parse(localStorage.getItem("saveCities")) || [];
var city = cities[0] || "San Francisco";
var date = moment().format('YYYY-MM-DD');
var date1 = moment().add(1, 'days').calendar();
var date2 = moment().add(2, 'days').calendar();
var date3 = moment().add(3, 'days').calendar();
var date4 = moment().add(4, 'days').calendar();
var date5 = moment().add(5, 'days').calendar();
var forecast;
var lat;
var long;
var uV = 0;
var weatImg;

// function of function, allows page to render cities and display forcasts on refresh or arrival
function tellWeather() {
  renderCities()
  currForecast()
  futForecast()
}
tellWeather()

// creates a new city, appends to list of cities, 
$("#inputButton").on("click", function (event) {
  event.preventDefault()
  city = $("#inputCity").val().trim()
  // prevent a "" or null bar from being created
  if (city !== "") {
    // Adding city from the textbox to our array
    cities.push(city);
    $("#inputCity").val("");
    // Calling renderButtons which handles the processing of our cities array
    tellWeather(city)
  }
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
    saveCities();
  }
}

// saves cities array into local storage
function saveCities() {
  localStorage.setItem("saveCities", JSON.stringify(cities));
}

// pulls up a city and displays its current weather and forecast
$(document).on("click", "#cityBtn", function () {
  city = $(this).text()
  currForecast()
  futForecast()
})

// api call to gather information for current forecast and display on page
function currForecast() {
  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=0337ee5c21f2fbff84511550c3460591',
    method: "GET"
  }).then(function (response) {
    forecast = response
    // declare an image tag to place the weather icon with city and date
    weatImg = $("<img src=http://openweathermap.org/img/wn/" + forecast.weather[0].icon + ".png />")
    $("#city").text(city + " - " + date)
    $("#city").append(weatImg)
    // add text for temp, humidity, and wind speed
    $("#cityTemp").text("Temperature: " + ((((forecast.main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#cityHumid").text("Humidity: " + forecast.main.humidity + "%")
    $("#cityWind").text("Wind Speed: " + (forecast.wind.speed) + " MPH")
    // assign latitude and longitude for api call to determine the UV information, then make the API call
    lat = forecast.coord.lat
    long = forecast.coord.lon
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/uvi?appid=0337ee5c21f2fbff84511550c3460591&lat=' + lat + '&lon=' + long,
      method: "GET"
    }).then(function (response) {
      uV = response.value
        if (uV < 3) {
          $(".uvButton").attr("id", "low");
        }
        if (uV <= 6 && uV >=3) {
          $(".uvButton").attr("id", "med");
        }
        if (uV <= 9 && uV >=6.01) {
          $(".uvButton").attr("id", "high");
        }
        if (uV > 9) {
          $(".uvButton").attr("id", "v-high");
        }
      $(".uvButton").text(uV)
    })
  })
};

// api call to gather data for 5 day forecast and display to page
function futForecast() {
  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=0337ee5c21f2fbff84511550c3460591',
    method: "GET"
  }).then(function (response) {
    var day = response.list
    $("#day1").text(day[2].dt_txt.split(" ")[0])
    $("#day1Icon").html($("<img src=http://openweathermap.org/img/wn/" + day[2].weather[0].icon + ".png />"))
    $("#day1Temp").text("Temp: " + ((((day[2].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#day1Humid").text("Humidity: " + day[2].main.humidity + "%")
    $("#day2").text(day[10].dt_txt.split(" ")[0])
    $("#day2Icon").html($("<img src=http://openweathermap.org/img/wn/" + day[10].weather[0].icon + ".png />"))
    $("#day2Temp").text("Temp: " + ((((day[10].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#day2Humid").text("Humidity: " + day[10].main.humidity + "%")
    $("#day3").text(day[18].dt_txt.split(" ")[0])
    $("#day3Icon").html($("<img src=http://openweathermap.org/img/wn/" + day[18].weather[0].icon + ".png />"))
    $("#day3Temp").text("Temp: " + ((((day[18].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#day3Humid").text("Humidity: " + day[18].main.humidity + "%")
    $("#day4").text(day[26].dt_txt.split(" ")[0])
    $("#day4Icon").html($("<img src=http://openweathermap.org/img/wn/" + day[26].weather[0].icon + ".png />"))
    $("#day4Temp").text("Temp: " + ((((day[26].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#day4Humid").text("Humidity: " + day[26].main.humidity + "%")
    $("#day5").text(day[34].dt_txt.split(" ")[0])
    $("#day5Icon").html($("<img src=http://openweathermap.org/img/wn/" + day[34].weather[0].icon + ".png />"))
    $("#day5Temp").text("Temp: " + ((((day[34].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#day5Humid").text("Humidity: " + day[34].main.humidity + "%")
  })
}



