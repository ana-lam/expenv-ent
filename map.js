// initialize map

// starting point!
var newyorkcity = L.latLng([40.72, -74.2]);
var zoomLevel = 11.4;

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
    iconSize: [20, 20]
  }
});

var hazardicon = new Icon({iconUrl: 'hazard.png'}),
    trashicon = new Icon({iconUrl: 'trash.png'})
    stationicon = new Icon({iconUrl: 'station.png'})

// Tooltips for AOIs
var popupWilliamsburg_Greenpoint = "<b>Williamsburg-Greenpoint</b>" + '<br>#NoNBKPipe:' + " North Brooklyn <br>Coalition against National<br> Grid Fossil Fuel Expansion";
var popupSouthBronx = "<b>South Bronx</b>" + "<br>Fighting FreshDirect:" + " South <br>Bronx's struggle for environmental<br>and economic justice";
var popupSunsetPark = "<b>Sunset Park</b>" + "<br>Sunset Park";

// Markers of AOI
var williamsburg_Greenpoint = L.geoJSON(null, {color: "red"}).bindTooltip(popupWilliamsburg_Greenpoint, {permanent:true});
var southBronx = L.geoJSON(null, {color: "red"}).bindTooltip(popupSouthBronx, {direction:'right',permanent:true});
var sunsetPark = L.geoJSON(null, {color: "red"}).bindTooltip(popupSunsetPark, {permanent:true});

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

// Add baselayer change
var baseMaps =
        {
            "Grayscale"  :  grayscale,
            "Satellite" :  satellite
          };

// Add Leaflet controls
L.control.groupedLayers(baseMaps, null, {collapsed: false}).addTo(map);
satellite.addTo(map);
