import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import {
  addOne,
  updateOperation,
} from '../list/listSlice';
import {
  updateQueryName,
  updateQueryLatLng
} from '../geocoder/geocoderSlice';
import $ from 'jquery';

import icon from "./constants";

export default function LeafletControlGeocoder() {
  const dispatch = useDispatch();
  const map = useMap();

  useEffect(() => {
    var geocoder = L.Control.Geocoder.nominatim();
    if (typeof URLSearchParams !== "undefined" && window.location.search) {
      // parse /?geocoder=nominatim from URL
      var params = new URLSearchParams(window.location.search);
      var geocoderString = params.get("geocoder");
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      } else if (geocoderString) {
        console.warn("Unsupported geocoder", geocoderString);
      }
    }

    L.Control.geocoder({
      query: "",
      placeholder: "Search here...",
      defaultMarkGeocode: false,
      geocoder
    })
    // TODO: on markgeocode listener, add location to list
      .on("markgeocode", function (e) {
        var latlng = e.geocode.center;
        var markers = {};
        markers = L.marker(latlng, { icon })

          .on('dblclick', function() {
            map.flyTo(latlng, 10, { duration: 1 });
          })
          .on('popupopen', function() {
            $('a.addlocation').click(function(event){
              event.preventDefault();
              const payload = {
                metadata: {
                  name: e.geocode.name,
                  latLng: { lat: latlng.lat,
                            lng: latlng.lng },
                  description: "Insert Description Here",
                  timeRange: "Insert Time Range Here",
                }
              }
              dispatch(addOne(payload));
              //  remove temporary marker here after clicking on add location
              map.removeLayer(markers);
            });
            $('a.leaflet-popup-close-button').click(function(event){
              map.removeLayer(markers);
            });
          })
          .bindPopup('<strong>' + e.geocode.name + '</strong><br/>'
          + '<em>(' + latlng.lat + ', ' + latlng.lng + ')</em><br/>' 
          + '<a class="addlocation" href="/">Add Location</a>'
          )
          .openPopup()
          .addTo(map)
        // map.fitBounds(e.geocode.bbox);
        dispatch(updateQueryName(e.geocode.name));
        dispatch(updateQueryLatLng({ lat: latlng.lat,
                                     lng: latlng.lng }));
        dispatch(updateOperation('query'));
      })
      .addTo(map);
  }, []);

  return null;
}