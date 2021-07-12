// initialize map
// starting point!
var newyorkcity = L.latLng([40.66, -74.06]);
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

// Tooltips for AOIs
var williamsburg_Greenpoint = L.geoJSON(null, {color: "red"}).bindTooltip("<b>Williamsburg-Greenpoint</b>");
var southBronx = L.geoJSON(null, {color: "red"}).bindTooltip("<b>South Bronx</b>");
var sunsetPark = L.geoJSON(null, {color: "red"}).bindTooltip("<b>Sunset Park</b>");

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
var brooklynArmyTerminal = L.latLng([40.64542166950189, -74.02480596333815]);
var brooklynArmyTerminalMarker = L.marker(brooklynArmyTerminal, {icon:cameraicon}).addTo(map);
var brooklynArmyTerminalPopup = "<img src=" + "'brooklynarmyterminalsolar.jpeg'" + "width=" + "'300'"+ "/>" + "<p style=" + "'text-align:center'"+ ">" + "Brooklyn Army Terminal with community rooftop solar garden." + "<br><i>New York City Economic Development Corporation</p>"
brooklynArmyTerminalMarker.bindPopup(brooklynArmyTerminalPopup, {autoPan:"False"}).openPopup();

// Add baselayer change
var baseMaps =
        {
            "Grayscale"  :  grayscale,
            "Satellite" :  satellite
          };

// Add Leaflet control
L.control.groupedLayers(baseMaps, null, {collapsed: false}).addTo(map);
satellite.addTo(map);
