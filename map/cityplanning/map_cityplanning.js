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
    trashicon = new Icon({iconUrl: 'trash.png'}),
    stationicon = new Icon({iconUrl: 'station.png'}),
    toxicicon = new Icon({iconUrl: 'tri.png'})


// Markers of AOI
var williamsburg_Greenpoint = L.geoJSON(null, {color: "red", fillOpacity: 0}).bindTooltip("<b>Williamsburg-Greenpoint</b>");
var southBronx = L.geoJSON(null, {color: "red", fillOpacity: 0}).bindTooltip("<b>South Bronx</b>");
var sunsetPark = L.geoJSON(null, {color: "red", fillOpacity: 0}).bindTooltip("<b>Sunset Park</b>");


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
// function getColorpm25(d) {
//   return d > 11 ? "#08519c" :
//          d > 10 ? "#3182bd" :
//          d > 8.4 ? "#6baed6" :
//          d > 7.5 ? "#bdd7e7" :
//          d > 0 ? "#eff3ff" :
//          "#999";
//
// }
//
// function stylepm25(feature) {
//   return {
//     fillColor: getColorpm25(feature.properties.DataValue),
//     color: "#525252",
//     weight: 1,
//     fillOpacity: 0.6
//   };
// }
//
// var pm25 = L.geoJSON(null, {style: stylepm25});
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
// // load pm25 data
// $.getJSON("pm25.geojson", function(data) {
//   pm25.addData(data).addTo(map);
// });
//
//
// // create pm25 legend
// var legendpm25 = L.control({position: 'bottomright'});
//
// legendpm25.onAdd = function (map) {
//
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [0, 7.5, 8.4, 10, 11],
//         labels = [];
//
//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColorpm25(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '&ndash;18');
//     }
//
//     return div;
// };
//
// legendpm25.addTo(map);
//
// // define ozone choropleth layer
// function getColorozone(d) {
//   return d > 33.55 ? "#54278f" :
//          d > 32 ? "#756bb1" :
//          d > 30.35 ? "#9e9ac8" :
//          d > 27 ? "#cbc9e2" :
//          d > 14.4? "#f2f0f7" :
//          "#54278f";
// }
//
// function styleozone(feature) {
//   return {
//     fillColor: getColorozone(feature.properties.DataValue),
//     color: "#525252",
//     weight: 1,
//     fillOpacity: 0.6
//   };
// }
//
// var ozone = L.geoJSON(null, {style: styleozone});
//
// // load ozone data
// $.getJSON("ozone.geojson", function(ozonedata) {
//   ozone.addData(ozonedata).addTo(map);
// });

// define airquality choropleth layer
// function getColorair(d) {
//   return d > .625 ? "#54278f" :
//          d > .50 ? "#756bb1" :
//          d > .375? "#9e9ac8" :
//          d > .25 ? "#cbc9e2" :
//          d > .125? "#f2f0f7" :
//          "#54278f";
// }
//
// function styleair(feature) {
//   return {
//     fillColor: getColorair(feature.properties.average_Percentile),
//     color: "#525252",
//     weight: 1,
//     fillOpacity: 0.6
//   };
// }
//
// var airquality = L.geoJSON(null, {style: styleair});
//
// // load airquality data
// $.getJSON("airquality.geojson", function(airdata) {
//   airquality.addData(airdata).addTo(map);
// });
//
//
// define solid waste transfer facilities layer
var solidWasteTransfer = L.geoJson(null, {
  pointToLayer: function(feature, latlng){
    var marker = L.marker(latlng, {icon: trashicon});
    return marker;
  }
});

// load solid waste transfer facilities data
$.getJSON("transfer_stations_solidwaste.geoJSON", function(solidwastedata){
  solidWasteTransfer.addData(solidwastedata);
});

// define NPL Superfund sites data layer
var superfund = L.geoJson(null, {
  pointToLayer: function(feature, latlng){
    var marker = L.marker(latlng, {icon: hazardicon});
    return marker;
  }
});

// load NPL Superfund sites data
$.getJSON("NPL_superfundsites.geojson", function(superfunddata){
  superfund.addData(superfunddata);
});


// toxic release Sites

var tri = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    var marker = L.marker(latlng, {icon:toxicicon});
    return marker;
  }
});

$.getJSON("tri_nyc.geojson", function(tridata){
  tri.addData(tridata);
});
//
// // define poverty percentage choropleth layer
// function getColorpoverty(d) {
//   return d > 75 ? "#006d2c" :
//          d > 60 ? "#2ca25f" :
//          d > 45 ? "#66c2a4" :
//          d > 30 ? "#99d8c9" :
//          d > 15 ? "#ccece6" :
//          "#edf8fb";
// }
//
// function stylepoverty(feature) {
//   return {
//     fillColor: getColorpoverty(feature.properties.DataValue),
//     color: "#525252",
//     weight: 1,
//     fillOpacity: 0.6
//   };
// }
//
// var inNearPoverty = L.geoJSON(null, {style: stylepoverty});
//
// // load in near poverty data
// $.getJSON("in_near_poverty_census.geojson", function(povertydata) {
//   inNearPoverty.addData(povertydata);
// });

// // define HOLC layer
// function getColorholc(g) {
//   return g == 'A' ? 'green' :
//          g == 'B' ? 'blue'  :
//          g == 'C' ? 'yellow' :
//          g == 'D' ? 'red' :
//          "#edf8fb";
// }
//
// function styleholc(feature) {
//   return {
//     fillColor: getColorholc(feature.properties.holc_grade),
//     color: "#525252",
//     weight: 1,
//     fillOpacity: 0.6
//   };
// }
//
// var holc = L.geoJSON(null, {style: styleholc});
//
// // load in HOLC Brooklyn DataValue
// $.getJSON("NYHOLC.geojson", function(holcdata) {
//   holc.addData(holcdata);
// });
//
//
function stylehighways (feature) {
  return {
   weight: 2.5,
 };
}

function highwayFilter(feature) {
  if (feature.properties.Route_Type === "Arterial Highway") return true
}

var highways = L.geoJSON(null, {filter:highwayFilter, style: stylehighways});
 $.getJSON("highways.geojson", function(highwaysdata) {
   highways.addData(highwaysdata);
 });


// zoning

function styleM3Zones(feature) {
  return {
    color : "#8856a7",
    weight: 2.5,
    fillOpacity: 0.5
  };
}

function zoneFilter(feature) {
 if (feature.properties.ZONEDIST === "M3-1") return true
}

var m3Zones = L.geoJSON(null, {filter:zoneFilter, style: styleM3Zones});
$.getJSON("zoning.geojson", function(zoningdata) {
 m3Zones.addData(zoningdata);
});
//
//
// // define poverty percentage choropleth layer
// function getColortemp(d) {
//   return d > 100.2 ? "#006d2c" :
//          d > 99.1 ? "#2ca25f" :
//          d > 97.8 ? "#66c2a4" :
//          d > 96.6 ? "#99d8c9" :
//          d > 92.6 ? "#ccece6" :
//          "#edf8fb";
// }
//
// function styletemp(feature) {
//   return {
//     fillColor: getColortemp(feature.properties.DataValue),
//     color: "#525252",
//     weight: 1,
//     fillOpacity: 0.6
//   };
// }
//
// var daytimetemp = L.geoJSON(null, {style: styletemp});
//
// // load in near poverty data
// $.getJSON("daytimetemp.geojson", function(tempdata) {
//   daytimetemp.addData(tempdata).addTo(map);
// });
//
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
  "City Planning" : {
    "NPL Superfund Sites" : superfund,
    "Solid Waste Transfer Facilities" : solidWasteTransfer,
    "Toxic Release Inventory" : tri,
    "Highways & Major Streets" : highways,
    "Manufacturing Districts: M3" : m3Zones
  },
//   "Climate" : {
//     "Air Quality" : airquality,
//     "Daytime Surface Temperature" : daytimetemp
//   }
};
//
var options = {
  exclusiveGroups: ["Demographics"],
  collapsed: false
}



L.control.groupedLayers(baseMaps, groupedOverlays, options).addTo(map);
satellite.addTo(map);


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
