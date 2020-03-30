var city;





    // jQuery.ajaxPrefilter(function (options) {
    //   if (options.crossDomain && jQuery.support.cors) {
    //     options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    //   }
    // });

    $("#inputButton").on("click", function (event) {
        event.preventDefault()
        var city = $("#inputCity")
        console.log(city)
    

    $.ajax({
        url: 'api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=0337ee5c21f2fbff84511550c3460591',
        method: "GET"
      }).then(function (response) {
        console.log(response)



      })
    })










