import React from 'react';
import { List } from './features/list/List';
import {
  selectList,
} from './features/list/listSlice';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './App.css';

function App() {
  // TODO: Change position to be average of all the coordinates
  const position = [37.7648, -122.463];
  const locations = useSelector(selectList).map((location) => {
    return { position: [ location.latLng.lat, location.latLng.lng ],
             description: location.description,
             timeRange: location.timeRange,
           };
  })

  return (
    <div className="App">
      <header className="App-header">
        <div className="app-container">
          <div id="list">
            <List />
          </div>
          <div id="map">
            <MapContainer center={position} zoom={13}>
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
