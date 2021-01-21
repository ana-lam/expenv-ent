// initialize map
var map = L.map("mapdiv", {zoomControl: false});

// starting point!
var newyorkcity = L.latLng([40.7, -74.15]);
var zoomLevel = 11;

// tile layer for the map
map.setView(newyorkcity, zoomLevel);
L.tileLayer.provider("Esri.WorldImagery").addTo(map);

// marker for our starting point
var grandst = L.latLng([40.72207, -73.939589]);
var grandstMarker = L.marker(grandst).addTo(map);
var md = markdownit({html: true}).use(markdownitFootnote);
grandstMarker.bindPopup(md.render("### Hello from the [Grand St Station](http://web.mta.info/nyct/service/lline.htm)!"));

// define community district layer
var communitydistricts = L.geoJSON(null, {
  style() {
    return {
      color: "#525252",
      weight: 1,
      fillOpacity: 0.0
    };
  }
});

// load community district geodata
$.getJSON("cd.geojson", function(geodata) {
  communitydistricts.addData(geodata).addTo(map);
});

// define ozone choropleth layer
function getColorozone(d) {
  return d > 14.4 ? "#f2f0f7" :
         d > 27 ? "#cbc9e2" :
         d > 30.35 ? "#9e9ac8" :
         d > 32 ? "#756bb1" :
         d > 33.55 ? "#54278f" :
         "#54278f";

}

function styleozone(feature) {
  return {
    fillColor: getColorozone(feature.properties.DataValue),
    color: "#54278f",
    weight: 1,
    fillOpacity: 0.6
  };
}

var ozone = L.geoJSON(null, {style: styleozone});

// load ozone data
$.getJSON("ozone.geojson", function(ozonedata) {
  ozone.addData(ozonedata).addTo(map);
});

var overlayMaps = {
  "Community District Boundaries": communitydistricts,
  "Ozone": ozone
};

L.control.layers(null, overlayMaps).addTo(map);

// use jQuery to change card body
$.ajax({ url: "body.md",
  success(bodyMarkdown) {
    $("#outlet-card-body").html(md.render(bodyMarkdown));
  }
});
