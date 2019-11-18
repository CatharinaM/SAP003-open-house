var platform = new H.service.Platform({
    'apikey': '4suKp7ALVGG_DeM2J0bKH5XgCuWGWOozj4Cw3z0rk_8'
});

var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(
  document.getElementById('map'),
  defaultLayers.vector.normal.map,
  {
    zoom: 15,
    center: { lat: -23.5638813, lng: -46.657638 }
  });

  var geocodingParams = {
    searchText: 'Rua da Consolação, 2432, São Paulo, Brazil'
  };

  var onResult = function(result) {
    var locations = result.Response.View[0].Result,
      position,
      marker;
    for (let i = 0;  i < locations.length; i++) {
    position = {
      lat: locations[i].Location.DisplayPosition.Latitude,
      lng: locations[i].Location.DisplayPosition.Longitude
    };
    marker = new H.map.Marker(position);
    map.addObject(marker);
    }
  };
  
  var geocoder = platform.getGeocodingService();
  
 geocoder.geocode(geocodingParams, onResult, function(e) {
    alert(e);
  });



  var geocodingParams = {
    searchText: 'Av. Paulista, 1230, São Paulo, Brazil'
  };

  var onResult = function(result) {
    var locations = result.Response.View[0].Result,
      position,
      marker;
    for (let i = 0;  i < locations.length; i++) {
    position = {
      lat: locations[i].Location.DisplayPosition.Latitude,
      lng: locations[i].Location.DisplayPosition.Longitude
    };
    marker = new H.map.Marker(position);
    map.addObject(marker);
    }
  };
  
  var geocoder = platform.getGeocodingService();
  
  geocoder.geocode(geocodingParams, onResult, function(e) {
    alert(e);
  });



  var geocodingParams = {
    searchText: 'Av. Paulista, 2064, São Paulo, Brazil'
  };

  var onResult = function(result) {
    var locations = result.Response.View[0].Result,
      position,
      marker;
    for (let i = 0;  i < locations.length; i++) {
    position = {
      lat: locations[i].Location.DisplayPosition.Latitude,
      lng: locations[i].Location.DisplayPosition.Longitude
    };
    marker = new H.map.Marker(position);
    map.addObject(marker);
    }
  };
  
  var geocoder = platform.getGeocodingService();
  

  geocoder.geocode(geocodingParams, onResult, function(e) {
    alert(e);
  });
  



  var geocodingParams = {
    searchText: 'R. Augusta, 1475, São Paulo, Brazil'
  };

  var onResult = function(result) {
    var locations = result.Response.View[0].Result,
      position,
      marker;
    for (let i = 0;  i < locations.length; i++) {
    position = {
      lat: locations[i].Location.DisplayPosition.Latitude,
      lng: locations[i].Location.DisplayPosition.Longitude
    };
    marker = new H.map.Marker(position);
    map.addObject(marker);
    }
  };
  
  var geocoder = platform.getGeocodingService();
  

  geocoder.geocode(geocodingParams, onResult, function(e) {
    alert(e);
  });