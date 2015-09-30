function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var hour = a.getHours();
  if (hour > 12)
  	hour -= 12;
  var min = a.getMinutes();
  if (min < 10)
  	var time = hour + ':0' + min;
  else
  	var time = hour + ':' + min;
  return time;
}

function initMap(latitude, longitude) {
  var myLatLng = {lat: latitude, lng: longitude};

  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    scrollwheel: false,
    zoom: 4
  });

  // Create a marker and set its position.
  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
    title: 'Hello World!'
  });
}
function getWiki(cityname){
	console.log('getWiki: I got the city name: '+cityname);
	//Get call belwo
	//$.get("https://en.wikipedia.org/w/api.php?action=query&titles="+cityname+"&prop=revisions&rvprop=content&format=json", displayAllWikiData, "json");
	$.ajax( {
    url: 'https://en.wikipedia.org/w/api.php',
    data: cityname,
    dataType: 'json',
    type: 'POST',
    headers: { 'Api-User-Agent': 'Example/1.0' },
    success: function(data) {
       // do something with data
       displayAllWikiData(data);
    }
} );
}
function getWeather(cityname){
	console.log('I got the city name: '+cityname);
	//Get the info for the Poke passed in use disPokeDex as the call back function
	$.get("http://api.openweathermap.org/data/2.5/weather?q="+cityname+"&units=imperial", displayWeather, "json");
	
};
function displayAllWikiData(data){
	console.log('The JSON recieved from the Wiki API is in the format: ');
	console.log(data);
};
function displayAllWeatherData(data){
	console.log('The JSON recieved from the API is in the format: ');
	console.log(data);
};
function displayWiki(data){
	$('#cityinfo').empty();
	//Long / Lat goes here
	//$('#weather').append("<h6 class='grn'>Longitude : "+lat+" Latitude: "+lon+"</h6>");
	//Name goes here
	$('#cityinfo').append("<h1 class='blu'>"+data.name+"</h1>");
	//Image File
	$('#cityinfo').append("<img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png' alt='picture of forecast'>");
	//Text Based Forecast
	$('#cityinfo').append("<h6 class=''>Temperature: "+data.main.temp+"°F</h6>");
	$('#cityinfo').append("<h6>Currently: "+data.weather[0].description+"!</h6>");
}
function displayWeather(data){
	var lat = data.coord.lat;
	var lon = data.coord.lon;
	//Clear current div to display information
	$('#weather').empty();
	//Long / Lat goes here
	//$('#weather').append("<h6 class='grn'>Longitude : "+lat+" Latitude: "+lon+"</h6>");
	//Name goes here
	$('#weather').append("<h1 class='blu'>"+data.name+"</h1>");
	//Image File
	$('#weather').append("<img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png' alt='picture of forecast'>");
	//Text Based Forecast
	$('#weather').append("<h6 class=''>Temperature: "+data.main.temp+"°F</h6>");
	$('#weather').append("<h6>Currently: "+data.weather[0].description+"!</h6>");
	$('#weather').append("<h6>Wind: "+data.wind.speed+" mph</h6>");
	$('#weather').append("<h6>Humidity: "+data.main.humidity+"%</h6>");
	//Format UUNIX time
	var rise = timeConverter(data.sys.sunrise);
	var set = timeConverter(data.sys.sunset);
	$('#weather').append("<h6>Sunrise: "+rise+" AM | Sunset: "+set+" PM <span class='red'>(Note: Times reflected in your current time zone)</span></h6>");
	//Call google maps API
	initMap(lat, lon);
	getWiki(data.name);
};

