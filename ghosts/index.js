const syncMove = require("@mapbox/mapbox-gl-sync-move");
const styleA = {
  version: 8,
  terrain: { source: "mapbox-dem", exaggeration: 0.3 },
  sources: {
    hs: {
      type: "raster-dem",
      url: "mapbox://dnomadb.vashon-dsm",
      tileSize: 512,
      bounds: [-180, -85.05112877980659, 180, 85.0511287798066],
      encoding: "mapbox",
      paint: {
        "hillshade-highlight-color": "#fc9236"
      }
    },
    "mapbox-dem": {
      type: "raster-dem",
      url: "mapbox://dnomadb.vashon-dsm",
      tileSize: 512,
      encoding: "mapbox"
    }
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "black" }
    },
    {
      id: "hs",
      type: "hillshade",
      source: "hs",
      paint: { "hillshade-exaggeration": 1, "hillshade-highlight-color": "#fc9236"}
    },
    {
      id: "sky",
      type: "sky",
      paint: {
        "sky-type": "atmosphere",
        "sky-atmosphere-sun": [0, 0],
        "sky-atmosphere-sun-intensity": 0
      }
    }
  ]
};
const styleB = {
  version: 8,
  terrain: { source: "mapbox-dem", exaggeration: 0.3 },
  sources: {
    hs: {
      type: "raster-dem",
      url: "mapbox://dnomadb.vashon-dtm",
      tileSize: 512,
      bounds: [-180, -85.05112877980659, 180, 85.0511287798066],
      encoding: "mapbox"
    },
    "mapbox-dem": {
      type: "raster-dem",
      url: "mapbox://dnomadb.vashon-dtm",
      tileSize: 512,
      encoding: "mapbox"
    }
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "black" }
    },
    {
      id: "hs",
      type: "hillshade",
      source: "hs",
      paint: { "hillshade-exaggeration": 1, "hillshade-highlight-color": "#fc9236"}
    },
    {
      id: "sky",
      type: "sky",
      paint: {
        "sky-type": "atmosphere",
        "sky-atmosphere-sun": [0, 0],
        "sky-atmosphere-sun-intensity": 0
      }
    }
  ]
};
mapboxgl.accessToken =
  "pk.eyJ1IjoiZG5vbWFkYiIsImEiOiJjaW16aXFsZzUwNHJmdjdra3h0Nmd2cjY1In0.SqzkaKalXxQaPhQLjodQcQ";
const A = new mapboxgl.Map({
  container: "map-A",
  style: styleA,
  center: [-122.5071214,47.3514433],
  zoom: 9,
  hash: true,
  customAttribution: '<a href="ye">hi!!!!</a>',
  transformRequest: (r, t) => {
    if (t === "Tile" && /dnomadb.vashon-dsm/.test(r)) {
      const ZXY = /v4\/dnomadb\.vashon-dsm\/(\d+\/\d+\/\d+)/.exec(r);
      return {
        url: `https://api.mapbox.com/v4/dnomadb.vashon-dsm/${ZXY[1]}@2x.pngraw?access_token=${mapboxgl.accessToken}`
      };
    }
  }
});


const B = new mapboxgl.Map({
  container: "map-B",
  style: styleB,
  center: [-122.5071214,47.3514433],
  zoom: 9,
  hash: true,
  transformRequest: (r, t) => {
    if (t === "Tile" && /dnomadb.vashon-dtm/.test(r)) {
      const ZXY = /v4\/dnomadb\.vashon-dtm\/(\d+\/\d+\/\d+)/.exec(r);
      return {
        url: `https://api.mapbox.com/v4/dnomadb.vashon-dtm/${ZXY[1]}@2x.pngraw?access_token=${mapboxgl.accessToken}`
      };
    }
  }
});

syncMove(A, B);
