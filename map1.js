// initialize map
// starting point!
var newyorkcity = L.latLng([40.81, -73.97]);
var zoomLevel = 14;

// tile layer for the map
var satellite = L.tileLayer.provider("Esri.WorldImagery");
var grayscale = L.tileLayer.provider("Esri.WorldGrayCanvas");

// initialize map
var map = L.map("mapdiv", {
  zoomControl: false,
  layers: [satellite, grayscale]
});
map.setView(newyorkcity, zoomLevel);

// set icon dictionary
var Icon = L.Icon.extend({
  options: {
    iconSize: [35, 35]
  }
});

var hazardicon = new Icon({iconUrl: 'hazard.png'}),
    trashicon = new Icon({iconUrl: 'trash.png'}),
    stationicon = new Icon({iconUrl: 'station.png'}),
    cameraicon = new Icon({iconUrl: 'camera.png'});


// Tooltip of AOIs
var williamsburg_Greenpoint = L.geoJSON(null, {color: "red"}).bindTooltip("<b>Williamsburg-Greenpoint</b><br>Newton Creek");
var southBronx = L.geoJSON(null, {color: "red"}).bindTooltip("South Bronx");
var sunsetPark = L.geoJSON(null, {color: "red"}).bindTooltip("Sunset Park");

// AOI coordinates
$.getJSON("williamsburgGreenpoint.geojson", function(data) {
  williamsburg_Greenpoint.addData(data).addTo(map);
});

$.getJSON("southBronx.geojson", function(data) {
  southBronx.addData(data).addTo(map);
});

$.getJSON("sunsetPark.geojson", function(data) {
  sunsetPark.addData(data).addTo(map);
});

// Popups
var southHarlem = L.latLng([40.803899, -73.950470]);
var skyriseMarker = L.marker(southHarlem, {icon:cameraicon}).addTo(map);
var skyrisePopup = "<img src=" + "'SkyriseforHarlem.jpeg'" + "width=" + "'300'"+ "/>" + "<p style=" + "'text-align:center'"+ ">" + "Skyrise for Harlem, June Jordan & R. Buckminster Fuller." + "</p>"
skyriseMarker.bindPopup(skyrisePopup).openPopup();

// Add baselayer change
var baseMaps =
        {
            "Grayscale"  :  grayscale,
            "Satellite" :  satellite
          };

// Add Leaflet control
L.control.groupedLayers(baseMaps, null, {collapsed: false}).addTo(map);
satellite.addTo(map);
//L.control.layers(overlayMaps).addTo(map);
