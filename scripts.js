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

var pm25 = L.geoJSON(null, {style: stylepm25,
    onEachFeature: onEachFeature});

// adding interaction
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    pm25.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

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


var overlayMaps = {
  "Community District Boundaries": communitydistricts,
  "Fine Particulate Matter": pm25
};

L.control.layers(null, overlayMaps).addTo(map);

// use jQuery to change card body
$.ajax({ url: "body.md",
  success(bodyMarkdown) {
    $("#outlet-card-body").html(md.render(bodyMarkdown));
  }
});
