// some description coming soon

// initialize map
const map = L.map("mapdiv", {zoomControl: false});

// starting point!
const newyorkcity = L.latLng([40.7, -74.15]);
const zoomLevel = 11;

// tile layer for the map
map.setView(newyorkcity, zoomLevel);
L.tileLayer.provider("Esri.WorldImagery").addTo(map);

// marker for our starting point
const grandst = L.latLng([40.72207, -73.939589]);
const grandstMarker = L.marker(grandst).addTo(map);
const md = markdownit({html: true}).use(markdownitFootnote);
grandstMarker.bindPopup(md.render("### Hello from the [Grand St Station](http://web.mta.info/nyct/service/lline.htm)!"));

$.getJSON("boroughboundaries.geojson", geodata => {
  L.geoJSON(geodata, {
    style() {
      return {
        color: "#ff0000",
        weight: 3,
        fillOpacity: 0.0
      };
    }
  }).addTo(map);
});

// use jQuery to change card body
$.ajax({ url: "body.md",
  success(bodyMarkdown) {
    $("#outlet-card-body").html(md.render(bodyMarkdown));
  }
});
