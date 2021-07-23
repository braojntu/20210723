//Get Country data and Split the Latitude & Longitude
var request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.eu/rest/v2/all', true);
request.send();
request.onload = function () {
    var data = JSON.parse(this.response);
    //console.log(data);
    for (var i = 0; i < 250; i++) {
        try {
            var c_name = data[i].name;
            var c_latlng = data[i].latlng;
            //To catch the error during function execution
            if (c_latlng.length === 0) throw new Error("Latitude/Longitude for the country not available");

            fn_get_weather(c_name, ...c_latlng);
        }

        catch (e) {
            console.log("Error has been handled" + " " + c_name + "-", +e.message);
        }
    }
}

//Get Country Name, Latitude and Longitude
function fn_get_weather(name, lat, lang) {
    //console.log(name + " " + lat + " " + lang);
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lang + '&units=metric' + '&appid=48888dda1a55530dc8363cc8b34324f7', true);
    request.send();
    request.onload = function () {
        var data = JSON.parse(this.response);
        console.log(`${name}: ${data.main.temp}`)

    }
}