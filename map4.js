// initialize map
// starting point!
var newyorkcity = L.latLng([40.73, -73.99]);
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
var nonbkpipeline = L.latLng([40.703572, -73.944348]);
var nonbkpipelineMarker = L.marker(nonbkpipeline, {icon:cameraicon}).addTo(map);
var nonbkpipelinePopup = "<img src=" + "'nonbkpipeline.jpeg'" + "width=" + "'300'"+ "/>" + "<p style=" + "'text-align:center'"+ ">" + "Protest against North Brooklyn Pipeline." + "<br><i>Photograph: Erik McGregor/LightRocket/Getty Images</i>" + "</p>"
nonbkpipelineMarker.bindPopup(nonbkpipelinePopup, {autoPan:"False"}).openPopup();

// Add baselayer change
var baseMaps =
        {
            "Grayscale"  :  grayscale,
            "Satellite" :  satellite
          };

// Add Leaflet control
L.control.groupedLayers(baseMaps, null, {collapsed: false}).addTo(map);
satellite.addTo(map);
