// initialize map

// starting point!
var newyorkcity = L.latLng([40.81, -73.95]);
var zoomLevel = 13;

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

// Tooltip for AOIs
var williamsburg_Greenpoint = L.geoJSON(null, {color: "red"}).bindTooltip("<b>Williamsburg-Greenpoint</b><br>Newton Creek");
var southBronx = L.geoJSON(null, {color: "red"});
var sunsetPark = L.geoJSON(null, {color: "red"}).bindTooltip("Sunset Park");

// AOI coordinate data
$.getJSON("williamsburgGreenpoint.geojson", function(data) {
  williamsburg_Greenpoint.addData(data).addTo(map);
});

$.getJSON("southBronx.geojson", function(data) {
  southBronx.addData(data).addTo(map);
});

$.getJSON("sunsetPark.geojson", function(data) {
  sunsetPark.addData(data).addTo(map);
});

// Popup
var freshDirect = L.latLng([40.8013792948259, -73.91925571081482]);
var freshDirectMarker = L.marker(freshDirect, {icon:cameraicon}).addTo(map);
freshDirectMarker.bindPopup("<img src=" + "'freshdirect_nyt.jpeg'" + "width=" + "'300'"+ "/>" + "<p style=" + "'text-align:center'"+ ">" + "FreshDirect warehouse in South Bronx." + "</p>").openPopup();

// Add baselayer change
var baseMaps =
        {
            "Grayscale"  :  grayscale,
            "Satellite" :  satellite
          };

// Add Leaflet control
L.control.groupedLayers(baseMaps, null, {collapsed: false}).addTo(map);
satellite.addTo(map);
