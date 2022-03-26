import React, { useState } from 'react';
import { List } from './features/list/List';
import {
  selectList,
  selectBounds,
} from './features/list/listSlice';
import { useSelector } from 'react-redux';
import { latLngBounds } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import './App.css';

function MapBounds () {
  const map = useMap();
  map.fitBounds(useSelector(selectBounds));
  return null;
}

function App() {
  // TODO: Change position and zoom to be within bounds of marker group(s)
  // Ref(s): https://react-leaflet.js.org/docs/example-view-bounds/
  // https://leafletjs.com/SlavaUkraini/reference.html#latlngbounds
  const locations = useSelector(selectList).map((location) => {
    return { position: [ location.latLng.lat, location.latLng.lng ],
             description: location.description,
             timeRange: location.timeRange,
           };
  });
  const mapBounds = latLngBounds(useSelector(selectList).map((location) => {
    return [ location.latLng.lat, location.latLng.lng ];
  }));
  const [bounds, setBounds] = useState(mapBounds);
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="app-container">
          <div id="list">
            <List />
          </div>
          <div id="map">
            {/* <MapContainer center={position} zoom={13}> */}
            <MapContainer bounds={bounds}>
              <MapBounds />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {
                locations.map(function (location, index) {
                  return (
                    <Marker position={location.position} key={index} >
                      <Popup>
                        {location.description} <br/> {location.timeRange}
                      </Popup>
                    </Marker>
                  )
                })
              }
            </MapContainer>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
