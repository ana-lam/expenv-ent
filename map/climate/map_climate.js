// // initialize map
// var map = L.map("mapdiv", {
//   zoomControl: false,
//   layers: [satellite, grayscale]
// });

// starting point!
var newyorkcity = L.latLng([40.69, -74.1]);
var zoomLevel = 11;

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


// Markers of AOI
var williamsburg_Greenpoint = L.geoJSON(null, {color: "red"}).bindTooltip("<b>Williamsburg-Greenpoint</b>");
var southBronx = L.geoJSON(null, {color: "red"}).bindTooltip("<b>South Bronx</b>");
var sunsetPark = L.geoJSON(null, {color: "red"}).bindTooltip("<b>Sunset Park</b>");


// marker for our starting point
//var grandst = L.latLng([40.72207, -73.939589]);
//var grandstMarker = L.marker(grandst).addTo(map);
//var md = markdownit({html: true}).use(markdownitFootnote);
//grandstMarker.bindPopup(md.render("### Hello from the [Grand St Station](http://web.mta.info/nyct/service/lline.htm)!"));

// define community district layer
// var communitydistricts = L.geoJSON(null, {
//   style() {
//     return {
//       color: "#525252",
//       weight: 1,
//       fillOpacity: 0.0
//     };
//   }
// });

// load community district geodata
// $.getJSON("cd.geojson", function(geodata) {
//   communitydistricts.addData(geodata).addTo(map);
// });

// define fine particulate matter choropleth layer
function getColorpm25(d) {
  return d > 11 ? "#045a8d" :
         d > 10 ? "#2b8cbe" :
         d > 8.4 ? "#74a9cf" :
         d > 7.5 ? "#a6bddb" :
         d > 5.6 ? "#d0d1e6" :
         "#f1eef6";

}

function stylepm25(feature) {
  return {
    fillColor: getColorpm25(feature.properties.DataValue),
    color: "#525252",
    weight: 1,
    fillOpacity: 0.75
  };
}

var pm25 = L.geoJSON(null, {style: stylepm25});
//
// // adding interaction
// // function highlightFeature(e) {
// //     var layer = e.target;
// //
// //     layer.setStyle({
// //         weight: 5,
// //         color: '#666',
// //         dashArray: '',
// //         fillOpacity: 0.7
// //     });
// //
// //     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
// //         layer.bringToFront();
// //     }
// // }
// //
// // // function resetHighlight(e) {
// // //     pm25.resetStyle(e.target);
// // // }
// //
// // function zoomToFeature(e) {
// //     map.fitBounds(e.target.getBounds());
// // }
// //
// // function onEachFeature(feature, layer) {
// //     layer.on({
// //         mouseover: highlightFeature,
// //         mouseout: resetHighlight,
// //         click: zoomToFeature
// //     });
// // }
// //
// load pm25 data
$.getJSON("pm25.geojson", function(data) {
  pm25.addData(data);
});


// create pm25 legend


var legendpm25 = L.control({position: 'bottomright'});

legendpm25.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 5.6, 7.5, 8.4, 10, 11],
    labels = [];

  for (var i=0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColorpm25(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i+1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }

  return div;
};

//
// define ozone choropleth layer
function getColorozone(d) {
  return d > 33.55 ? "#810f7c" :
         d > 32 ? "#8856a7" :
         d > 30.35 ? "#8c96c6" :
         d > 27 ? "#9ebcda" :
         d > 14.4? "#bfd3e6" :
         "#edf8fb";
}

function styleozone(feature) {
  return {
    fillColor: getColorozone(feature.properties.DataValue),
    color: "#525252",
    weight: 1,
    fillOpacity: 0.75
  };
}

var ozone = L.geoJSON(null, {style: styleozone});

// load ozone data
$.getJSON("ozone.geojson", function(ozonedata) {
  ozone.addData(ozonedata);
});

// create ozonelegends

var legendOzone = L.control({position: 'bottomright'});

legendOzone.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 14.4, 27, 30.35, 32, 33.55],
    labels = [];

  for (var i=0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColorozone(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i+1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }

  return div;
};


//daytimetemp

function getColorHVI(d) {
  return d == 5 ? "#bd0026" :
         d == 4 ? "#f03b20" :
         d == 3 ? "#fd8d3c" :
         d == 2 ? "#feb24c" :
         d == 1 ? "#fed976" :
         "#ffffb2";
}

function styleHVI(feature) {
  return {
    fillColor: getColorHVI(feature.properties.DataValue),
    color: "#525252",
    weight: 1,
    fillOpacity: 0.75
  };
}

var HVI = L.geoJSON(null, {style: styleHVI});

// load in daytime temp data
$.getJSON("hvi.geojson", function(tempdata) {
  HVI.addData(tempdata);
});

var HVILegend = L.control({position: 'bottomright'});

HVILegend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
    grades = [1, 2, 3, 4, 5],
    labels = [];

  for (var i=0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColorHVI(grades[i]) + '"></i> ' +
      "Index " + grades[i] + '<br>';
  }

  return div;
};


//
// var empty = L.geoJSON(null);
//
//
var baseMaps =
        {
            "Grayscale"  :  grayscale,
            "Satellite" :  satellite
          };
//
var groupedOverlays = {
  // "Demographics" : {
  //   "Poverty Percentage" : inNearPoverty,
  //   "HOLC" : holc
  // }}
//   "City Planning" : {
//     "NPL Superfund Sites" : superfund,
//     "Solid Waste Transfer Facilities" : solidWasteTransfer,
//     "Highways & Major Streets" : highways
//   },
  "Climate" : {
    "Air Quality: Fine Particulate Matter (PM2.5)" : pm25,
    "Air Quality: Ozone (O3)" : ozone,
    "Heat Vulnerability Index" : HVI
  }
};
//
var options = {
  exclusiveGroups: ["Climate"],
  collapsed: false
}



L.control.groupedLayers(baseMaps, groupedOverlays, options).addTo(map);
satellite.addTo(map);


map.on('overlayadd', function(eventLayer){
  if (eventLayer.name === "Air Quality: Fine Particulate Matter (PM2.5)"){
    map.addControl(legendpm25);
  }
});

map.on('overlayremove', function(eventLayer){
    if (eventLayer.name === 'Air Quality: Fine Particulate Matter (PM2.5)'){
         map.removeControl(legendpm25);
    }
});

map.on('overlayadd', function(eventLayer){
  if (eventLayer.name === "Air Quality: Ozone (O3)"){
    map.addControl(legendOzone);
  }
});

map.on('overlayremove', function(eventLayer){
    if (eventLayer.name === 'Air Quality: Ozone (O3)'){
         map.removeControl(legendOzone);
    }
});

map.on('overlayadd', function(eventLayer){
  if (eventLayer.name === "Heat Vulnerability Index"){
    map.addControl(HVILegend);
  }
});

map.on('overlayremove', function(eventLayer){
    if (eventLayer.name === 'Heat Vulnerability Index'){
         map.removeControl(HVILegend);
    }
});


$.getJSON("williamsburgGreenpoint.geojson", function(data) {
  williamsburg_Greenpoint.addData(data).addTo(map);
});

$.getJSON("southBronx.geojson", function(data) {
  southBronx.addData(data).addTo(map);
});

$.getJSON("sunsetPark.geojson", function(data) {
  sunsetPark.addData(data).addTo(map);
});

williamsburg_Greenpoint.bringToFront();
southBronx.bringToFront();
sunsetPark.bringToFront();
//L.control.layers(overlayMaps).addTo(map);

// use jQuery to change card body
// $.ajax({ url: "body.md",
//   success(bodyMarkdown) {
//     $("#outlet-card-body").html(md.render(bodyMarkdown));
//   }
// });
