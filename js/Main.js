//Google Maps v3 JS API - Creates Map, Displays Layers, Toggle Functions

      var map, weatherLayer, cloudLayer;

      function initialize() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: new google.maps.LatLng(40.714353,-74.005973),
          zoom: 5,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        weatherLayer = new google.maps.weather.WeatherLayer({
          temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT,
          windSpeedUnits: google.maps.weather.WindSpeedUnit.MILES_PER_HOUR
        });
        weatherLayer.setMap(map);

        cloudLayer = new google.maps.weather.CloudLayer();
        //cloudLayer.setMap(map);

  var input = /** @type {HTMLInputElement} */(document.getElementById('target'));

  var searchBox = new google.maps.places.SearchBox(input);

  var markers = [];
 
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();
    
  for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }


    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

     

      bounds.extend(place.geometry.location);
   }

    map.fitBounds(bounds);
    map.setZoom(8);

  });

google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });


      }
      google.maps.event.addDomListener(window, 'load', initialize);

      function toggleClouds() {
        cloudLayer.setMap(cloudLayer.getMap() ? null : map);
      }

      function toggleIcons() {
        weatherLayer.setMap(weatherLayer.getMap() ? null : map);
      }

      function setLabelColor(color) {
        weatherLayer.setOptions({'labelColor': color});
      }

      function setTemperature(units) {
        weatherLayer.setOptions({'temperatureUnits': units});
      }

      function setWindSpeed(units) {
        weatherLayer.setOptions({'windSpeedUnits': units});
      }
      
//Geo-Location and Geo-Error Functions
      function GeoLocation() {
      	if(navigator.geolocation) {
      	 browserSupportFlag = true;
    	 navigator.geolocation.getCurrentPosition(function(position) {
         initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
         map.setCenter(initialLocation);
         map.setZoom(12);
    	}, function() {
      	 handleNoGeolocation(browserSupportFlag);
    	});
  	}
  	// Browser doesnt support Geolocation
  	else {
    	  browserSupportFlag = false;
    	  handleNoGeolocation(browserSupportFlag);
	}
	}
  
  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      alert("Geolocation service failed. So we've sent you to New York!");
      initialLocation = newyork;
    } else {
      alert("Your browser doesn't support geolocation.");
    }
    map.setCenter(initialLocation);
  }	

// Toggles for both Icons and Clouds
	$('#toggleIcons').on('switch-change', function (e) {
	  toggleIcons();
	});
    
	$('#toggleClouds').on('switch-change', function (e) {
          toggleClouds();
	});

//Menu Slider
//<![CDATA[ 
      $(window).load(function(){
      
        changeContent = function(key) {

	  switch (key)
	  {
	  case 'Home':
	    $("#content").load("index.html #map",initialize);
	    initialize()
	    break;
	  case 'About':
	    $("#content").load('about.html');
	    break;
	  }

        }
        
        $("#menu a").click(function(e) {
          $('#menu').collapse('hide');
          changeContent(e.target.textContent);
        });
               
      });//]]>  

// Menu Scrolling for Mobile
//function stopScrolling( touchEvent ) { touchEvent.preventDefault(); }
//var el = document.getElementById("Scroll");
//el.addEventListener('touchmove' , stopScrolling , false);