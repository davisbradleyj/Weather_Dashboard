# Weather_Dashboard

## Technologies Used
- HTML - used to create elements on the DOM
- CSS - present to add styling elements
- Bootstrap - automate syling elements
- jQuery - used to create the logic controlling the application
- AJAX - make API calls and pull data
- OpenWeatherMap - API for calling weather forecast data
- Git - version control system to track changes to source code
- GitHub - hosts repository that can be deployed to GitHub Pages

## Summary

While not quite as dynamic as the day planner, there are still some dynamic elements that fit over the html page.  As a strecth goal, I aim to clean up the code to remove static elements from the html for the 5 day forecast, similar to the logic in place to create the city buttons.  The current html structure is present below.

I ran into a little trouble getting the local storage to set, and I am still doing my best not to overwrite global variables within functions by redeclaring the variable.  This led to a bit of a block while trying to adequately render the cities. The other major block came about with the the assigment of color blocks to the UV rating, and accessing that data as it required sourcing through latitude and longitude coordinates. Code snippets of this js code is below.

Final product images is direcly below

<img src="https://github.com/davisbradleyj/Weather_Dashboard/blob/master/Assets/forecast.png">

## Code Snippet

```html
<div class="form-group mb-0">
    <div class="input-group">
        <!-- Search bar for new cities -->
        <input type="search" class="form-control" id="inputCity" style="width: 200px">
        <button type="submit" class="btn btn-primary" id="inputButton">Go!</button>
        </span>
    </div>            
</div>
<hr>
<div>
    <!-- Assorted buttons from past searches -->
    <div id="cityButton"></div>


<div class="row">
    <div class="card card-body ml-3 mr-3 px-2 py-2 mw-20 float-left text-white bg-primary">
        <h5 class="strong pb-2" id="day1"></h5>
        <div class="py-2" id="day1Icon"></div>
        <div class="py-2" id="day1Temp"></div>
        <div class="pt-2" id="day1Humid"></div>
    </div>
    <div class="card card-body ml-3 mr-3 px-2 py-2 mw-20 float-left text-white bg-primary">
        <h5 class="strong pb-2" id="day2"></h5>
        <div class="py-2" id="day2Icon"></div>
        <div class="py-2" id="day2Temp"></div>
        <div class="pt-2" id="day2Humid"></div>
     </div>
    <div class="card card-body ml-3 mr-3 px-2 py-2 mw-20 float-left text-white bg-primary">
        <h5 class="strong pb-2" id="day3"></h5>
        <div class="py-2" id="day3Icon"></div>
        <div class="py-2" id="day3Temp"></div>
        <div class="pt-2" id="day3Humid"></div>
     </div>
    <div class="card card-body ml-3 mr-3 px-2 py-2 mw-20 float-left text-white bg-primary">
        <h5 class="strong pb-2" id="day4"></h5>
        <div class="py-2" id="day4Icon"></div>
        <div class="py-2" id="day4Temp"></div>
        <div class="pt-2" id="day4Humid"></div>
     </div>
    <div class="card card-body ml-3 mr-3 px-2 py-2 mw-20 float-left text-white bg-primary">
        <h5 class="strong pb-2" id="day5"></h5>
        <div class="py-2" id="day5Icon"></div>
        <div class="py-2" id="day5Temp"></div>
        <div class="pt-2" id="day5Humid"></div>
    </div>
```

```js
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

```


## Acknowledgements

Jerome Chenette, Kerwin Hy, Mahisha Manikandan, Corbin Brockbank, Michael Downs

## Author Links

Brad Davis
[Email](davis.bradleyj@gmail.com)
[LinkedIn](https://www.linkedin.com/in/brad-davis-7885884/)
[GitHub](https://github.com/davisbradleyj)
