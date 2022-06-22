// Import stylesheets
import './style.css';
import {
  Marker,
  Map,
  CircleMarker,
  Polyline,
  Icon,
  Canvas,
  Polygon,
  popup,
  GeoJSON,
} from 'leaflet';

//创建高德地图
var amap = new AMap.Map('amap', {
  fadeOnZoom: false,
  navigationMode: 'classic',
  optimizePanAnimation: false,
  animateEnable: false,
  dragEnable: false,
  mapStyle: 'amap://styles/dark',
  // mapStyle: 'amap://styles/242e59d29506cac6a4d60c3ad08f4951',
  // zoomEnable: false,
  resizeEnble: true,
  doubleClickZoom: false,
  keyboardEnable: false,
  scrollWheel: false,
  expandZoomRange: false,
  zooms: [1, 20],
  features: ['road', 'point', 'bg'],
  viewMode: '2D',
});
const map = new Map('map', {
  renderer: new Canvas(),
});

// Map和高德地图耦合
map.on('zoom', (evt) => {
  amap.setZoom(evt.target.getZoom());
});
map.on('move', (evt) => {
  const pt = evt.target.getCenter();
  amap.setZoomAndCenter(evt.target.getZoom(), [pt.lng, pt.lat]);
});
//设置视图
map.setView([39.95286642741858, 116.3911235332489], 12);

// 1个点
new Marker([39.909176, 116.397411], {
  icon: new Icon({
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
}).addTo(map);

//====多个点start========
const geoData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        NAME: '北三环一号',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.3911235332489, 39.95286642741858],
      },
    },
    {
      type: 'Feature',
      properties: {
        NAME: '北三环二号',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.38795852661131, 39.94758202338572],
      },
    },
    {
      type: 'Feature',
      properties: {
        NAME: '北三环三号',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.39014720916748, 39.95090487138684],
      },
    },
  ],
};

const layerGroup = new GeoJSON(geoData, {
  pointToLayer: (geoJsonPoint, latlng) => {
    return new Marker(latlng, {
      icon: new Icon({
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      }),
    });
  },
});
// layerGroup.addTo(map);
//====多个点end========
layerGroup.addTo(map).bindPopup((layer) => {
  return (
    '<p>Hello world!<br />This is a nice popup of ' +
    layer.feature.properties['NAME'] +
    '</p>'
  );
});
