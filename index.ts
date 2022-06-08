/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: { lat: 29.715, lng: -95.872 },
      zoom: 13,
      mapTypeControl: false,
    }
  );
  const card = document.getElementById("pac-card") as HTMLElement;
  const input = document.getElementById("pac-input") as HTMLInputElement;
  const biasInputElement = document.getElementById(
    "use-location-bias"
  ) as HTMLInputElement;
  const strictBoundsInputElement = document.getElementById(
    "use-strict-bounds"
  ) as HTMLInputElement;
  const options = {
    strictBounds: true,
    types: ["address"],
  };

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

  const autocomplete = new google.maps.places.Autocomplete(input, options);

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo("bounds", map);

  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById(
    "infowindow-content"
  ) as HTMLElement;

  infowindow.setContent(infowindowContent);


  const flightPlanCoordinates = [
    {lng: -95.854375, lat: 29.698250},
    {lng: -95.852165, lat: 29.696712},
    {lng: -95.850282, lat: 29.698711},
    {lng: -95.850622, lat: 29.699618},
    {lng: -95.851221, lat: 29.700468},
  ];
  const flightPath = new google.maps.Polygon({
    paths: flightPlanCoordinates,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.3,
  });

  flightPath.setMap(map);

  // const ctaLayer = new google.maps.KmlLayer({
  //   url: "https://raw.githubusercontent.com/jeremyodell/flag-route/main/ccrFlagRoute.kml",
  //   map: map,
  // });

  

  autocomplete.addListener("place_changed", () => {
    infowindow.close();

    const place = autocomplete.getPlace();
    const location = place.geometry;
    console.log('here is the location ', location);
    const poly = google.maps.geometry.poly;
    console.log('here is the place', place);

    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    google.maps.geometry.poly.containsLocation(location.location, flightPath);

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(1);
    }

    // marker.setPosition(place.geometry.location);
    // marker.setVisible(true);

    infowindowContent.children["place-name"].textContent = place.name;
    infowindowContent.children["place-address"].textContent =
      place.formatted_address;
    //infowindow.open(map, marker);
  });

}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
