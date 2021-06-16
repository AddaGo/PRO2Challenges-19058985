//keep the user input in variable to use in both APIs
var cityName;

//Mapbox API
function getMapdata(){
    cityName = document.getElementById('input').value;

    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRkYWdvIiwiYSI6ImNrY2dvZTRjcTBzaHIydG84ZDhjMXc2OW4ifQ.GMxtCLBZvbLU1WOiuD0B5w';
    var map = new mapboxgl.Map({
        container: 'mapspanel', // container ID
        style: 'mapbox://styles/mapbox/dark-v10', // style URL
        center: [0,0], // starting position [lng, lat]
        zoom: 1.8 // starting zoom
        });

    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        zoom: 15
    }); 
    
    map.addControl(geocoder);
    
    geocoder.query(cityName);

}

//OpenWeather API
function getWeatherdata(){
    var request = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=7dcc3fa628ebe2eb78e78d2b8a104eb3';
    fetch(request)
    .then(
        function(response){
            return response.json();
        }
    )

    .then(
        function(response){
            var degrees = Math.floor(response.main.temp - 273.15);
            document.getElementById('weather').innerHTML = response.name + '<br>' + degrees + ' &#176;' +'C';
            document.getElementById('weather').innerHTML += '<br>' + response.weather[0].description;

            document.getElementById('moreweather').innerHTML = '<br>' + 'Pressure:' + response.main.pressure;
            document.getElementById('moreweather').innerHTML += '<br>' + 'Humidity:' + response.main.humidity;
        }
    )
}



//both APIs get triggered at the button click
document.getElementById('button').onclick = function(){
getMapdata();
getWeatherdata();
}