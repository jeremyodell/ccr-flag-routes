/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

const myPolygons = [
  {
    scout: 'Carson Odell',
    name: 'Yellow Area',
    path: [
      // You have to changes those values with lats and lngs of your polygon
      { lng: -95.854375, lat: 29.69825 },
      { lng: -95.852165, lat: 29.696712 },
      { lng: -95.850282, lat: 29.698711 },
      { lng: -95.850622, lat: 29.699618 },
      { lng: -95.851221, lat: 29.700468 },
    ],
    geodesic: true,
    strokeColor: '#FFd000',
    strokeOpacity: 1.0,
    strokeWeight: 4,
    fillColor: '#FFd000',
    fillOpacity: 0.35,
  },
  {
    name: 'Blue Area',
    path: [
      // You have to changes those values with lats and lngs of your polygon
      { lat: 11.0194794, lng: -74.8504209 },
      { lat: 11.0131404, lng: -74.8276712 },
      { lat: 10.9946794, lng: -74.8395515 },
    ],
    geodesic: true,
    strokeColor: 'blue',
    strokeOpacity: 1.0,
    strokeWeight: 4,
    fillColor: 'blue',
    fillOpacity: 0.35,
  },
  {
    name: 'Green Area',
    path: [
      // You have to changes those values with lats and lngs of your polygon
      { lat: 10.9772761, lng: -74.8134354 },
      { lat: 10.9933967, lng: -74.8183852 },
      { lat: 10.987963, lng: -74.78883119 },
    ],
    geodesic: true,
    strokeColor: 'green',
    strokeOpacity: 1.0,
    strokeWeight: 4,
    fillColor: 'green',
    fillOpacity: 0.35,
  },
];

function initMap() {
  let map;
  let marker;

  const createMap = ({ latitude, longitude, polygons, mapId, inputId }) => {
    const center = new google.maps.LatLng(latitude, longitude);

    map = new google.maps.Map(document.getElementById(mapId), {
      center,
      zoom: 14,
      scaleControl: true,
    });

    marker = new google.maps.Marker({ position: center });

    const createGooglePolygons = ({ name, scout, ...polygon }) => {
      const newPolygon = new google.maps.Polygon(polygon);
      newPolygon.setMap(map);

      return { name, scout, polygon: newPolygon };
    };

    const googlePolygons = polygons.map(createGooglePolygons);

    const input = document.getElementById(inputId);

    const autocomplete = new google.maps.places.Autocomplete(input);

    const onAutocompleteChange = () => {
      const place = autocomplete.getPlace();
      const location = place.geometry.location;
      const poly = google.maps.geometry.poly;

      if (!place.geometry)
        return alert("Autocomplete's returned place contains no geometry");

      marker.setPosition(location);
      marker.setMap(map);

      const isLocationInsidePolygon = ({ polygon }) =>
        poly.containsLocation(location, polygon);

      const matchedPolygon = googlePolygons.find(isLocationInsidePolygon);

      if (!matchedPolygon)
        return alert('The address does not match any valid area');

      alert(`The ${matchedPolygon.scout} contains the address`);
      console.log('here is the poly ', matchedPolygon);
    };

    autocomplete.addListener('place_changed', onAutocompleteChange);
  };

  createMap({
    latitude: 29.715, //Put your origin latitude here
    longitude: -95.872, //Put your origin longitude here
    polygons: myPolygons,
    mapId: 'js-map',
    inputId: 'js-input',
  });
}

window.onload = initMap;
