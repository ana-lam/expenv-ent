var datalayer = L.layerGroup();
$.getJSON("cd.geojson", geodata => {
  L.geoJSON(geodata, {
    style() {
      return {
        color: "#000000",
        weight: 1,
        fillOpacity: 0.0
      };
    }
  }).addTo(datalayer);
});

// fine particulate matter layer with choropleth feature
$.getJSON("pm25.geojson", function(data){
  L.geoJSON( data , {
  style: function(feature){
    var fillColor,
        DataValue = feature.properties.DataValue;
    if ( DataValue > 11 ) fillColor = "#006837";
    else if ( DataValue > 10 ) fillColor = "#31a354";
    else if ( DataValue > 8.4 ) fillColor = "#78c679";
    else if ( DataValue > 7.5 ) fillColor = "#c2e699";
    else if ( DataValue > 0 ) fillColor = "#ffffcc";
    else fillColor = "#f7f7f7";
    return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
      },
      onEachFeature: function( feature, layer ){
        layer.bindPopup( "<strong>" + feature.properties.Name + "</strong><br/>" + feature.properties.DataValue + " PM2.5" )
      }
    }).addTo(datalayer);
  });


var satellite = L.tileLayer.provider("Esri.WorldImagery");

var map = L.map("mapdiv", {center: [40.7, -74.15],
                          zoomLevel: 11,
                          layers: satellite});

var baseLayers = {
  "BaseMap": satellite
};

var overlays = {
  "Data": datalayer
};

L.control.layers(baseLayers, overlays).addTo(map);

// marker for our starting point
const grandst = L.latLng([40.72207, -73.939589]);
const grandstMarker = L.marker(grandst).addTo(map);
const md = markdownit({html: true}).use(markdownitFootnote);
grandstMarker.bindPopup(md.render("### Hello from the [Grand St Station](http://web.mta.info/nyct/service/lline.htm)!"));


  // use jQuery to change card body
  $.ajax({ url: "body.md",
    success(bodyMarkdown) {
      $("#outlet-card-body").html(md.render(bodyMarkdown));
    }
  });
