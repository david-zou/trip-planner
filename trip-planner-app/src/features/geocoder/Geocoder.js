import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import {
  addOne,
  updateOperation,
  selectList
} from '../list/listSlice';

import icon from "./constants";

export default function LeafletControlGeocoder() {
  const list = useSelector(selectList);
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
        L.marker(latlng, { icon })
          // .addTo(map)
          .bindPopup(e.geocode.name)
          .openPopup();
        map.fitBounds(e.geocode.bbox);
        const payload = {
          index: list.length,
          metadata: {
            name: e.geocode.name,
            latLng: { lat: latlng.lat,
                      lng: latlng.lng },
            description: "N/A",
            timeRange: "N/A",
          }
        }
        dispatch(addOne(payload));
        dispatch(updateOperation('save'));
      })
      .addTo(map);
  }, []);

  return null;
}