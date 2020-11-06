// some description coming soon

// initialize map
const map = L.map("mapdiv", {zoomControl: false});

// starting point!
const newyorkcity = L.latLng([40.712207, -73.939589]);
const zoomLevel = 10.3;

// tile layer for the map
map.setView(newyorkcity, zoomLevel);
L.tileLayer.provider("Esri.WorldImagery").addTo(map);

// marker for our starting point
const grandstMarker = L.marker(newyorkcity).addTo(map);
const md = markdownit({html: true}).use(markdownitFootnote);
grandstMarker.bindPopup(md.render("### Hello from the [Grand St Station](http://web.mta.info/nyct/service/lline.htm)!"));

// Use jquery to manipulate html parts
// card header:
$("#card-header-text").html("Something will appear here momentarily!");

// card body link to body.md file:
$.ajax({ url: "body.md",
        success(bodyMarkdown) {
          $("#outlet-card-body").html(md.render(bodyMarkdown));
        }
       });
