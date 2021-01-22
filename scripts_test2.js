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

// define fine particulate matter choropleth layer

function getColorpm25(d) {
  return d > 11 ? "#03018C" :
         d > 10 ? "#212AA5" :
         d > 8.4 ? "#4259C3" :
         d > 7.5 ? "#7B9FF2" :
         d > 0 ? "#9EC2FF" :
         "#999";

}

function stylepm25(feature) {
  return {
    fillColor: getColorpm25(feature.properties.DataValue),
    color: "#525252",
    weight: 1,
    fillOpacity: 0.6
  };
}

var pm25 = L.geoJSON(null, {style: stylepm25});

// adding interaction
// function highlightFeature(e) {
//     var layer = e.target;
//
//     layer.setStyle({
//         weight: 5,
//         color: '#666',
//         dashArray: '',
//         fillOpacity: 0.7
//     });
//
//     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//         layer.bringToFront();
//     }
// }
//
// // function resetHighlight(e) {
// //     pm25.resetStyle(e.target);
// // }
//
// function zoomToFeature(e) {
//     map.fitBounds(e.target.getBounds());
// }
//
// function onEachFeature(feature, layer) {
//     layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight,
//         click: zoomToFeature
//     });
// }
//
// load pm25 data
$.getJSON("pm25.geojson", function(data) {
  pm25.addData(data).addTo(map);
});


// create pm25 legend
var legendpm25 = L.control({position: 'bottomright'});

legendpm25.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 7.5, 8.4, 10, 11],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorpm25(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '&ndash;18');
    }

    return div;
};

legendpm25.addTo(map);

// define ozone choropleth layer
function getColorozone(d) {
  return d > 33.55 ? "#54278f" :
         d > 32 ? "#756bb1" :
         d > 30.35 ? "#9e9ac8" :
         d > 27 ? "#cbc9e2" :
         d > 14.4? "#f2f0f7" :
         "#54278f";
}

function styleozone(feature) {
  return {
    fillColor: getColorozone(feature.properties.DataValue),
    color: "#525252",
    weight: 1,
    fillOpacity: 0.6
  };
}

var ozone = L.geoJSON(null, {style: styleozone});

// load ozone data
$.getJSON("ozone.geojson", function(ozonedata) {
  ozone.addData(ozonedata).addTo(map);
});

// waste stuff

// function addMarkers(landmark) {
//     var marker = L.marker([landmark.Latitude, landmark.Longitude]);
//     marker.addTo(map);
//   }
//
// d3.csv("transfer_stations_solidwaste.csv", function(csv) {
//   csv.forEach(function (landmark){
//     addMarkers(landmark);
//   });
// });

// $.get("transfer_stations_solidwaste.csv", function(csvString) {
//   var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
//   for (var i in data) {
//     var row = data[i];
//     var marker = L.marker([row.Latitude, row.Longitude], {
//       opacity: 1
//     }).bindPopup(row.FacilityName);
//     marker.addTo(map);
//   }
// });

var solidWasteTransfer = L.geoJson(null);
$.getJSON("transfer_stations_solidwaste.geoJSON", function(solidwastedata){
  solidWasteTransfer.addData(solidwastedata).addTo(map);
});

var overlayMaps = {
  "Community District Boundaries": communitydistricts,
  "Fine Particulate Matter": pm25,
  "Ozone": ozone
  "Solid Waste Transfer Facilities": solidWasteTransfer
};

L.control.layers(null, overlayMaps).addTo(map);

// use jQuery to change card body
$.ajax({ url: "body.md",
  success(bodyMarkdown) {
    $("#outlet-card-body").html(md.render(bodyMarkdown));
  }
});
