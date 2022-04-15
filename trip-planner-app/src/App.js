import React from 'react';
import { List } from './features/list/List';
import {
  selectList,
  selectBounds,
  selectSelected,
  selectOperation,
} from './features/list/listSlice';
import LeafletControlGeocoder from "./features/geocoder/Geocoder";
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { latLngBounds } from 'leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

const MapBounds = () => {
  const map = useMap();
  const bounds = latLngBounds(useSelector(selectBounds));
  // console.log('bounds in MapBounds:', bounds);
  map.fitBounds(bounds);
  return null;
}

const FlyToCoords = ({ latLng }) => {
  const map = useMap();
  // console.log('flyToCoords called, what is latLng?', latLng)
  map.flyTo(latLng, 14, { duration: 2 });
  return null;
}

function App() {
  // TODO: Change position and zoom to be within bounds of marker group(s)
  // Ref(s): https://react-leaflet.js.org/docs/example-view-bounds/
  // https://leafletjs.com/SlavaUkraini/reference.html#latlngbounds
  const locationList = useSelector(selectList);
  const selected = useSelector(selectSelected); // currently selected location
  const selectOperationMode = useSelector(selectOperation) === 'select';
  const saveOperationMode = useSelector(selectOperation) === 'save';
  const deleteOperationMode = useSelector(selectOperation) === 'delete';
  const initialized = useSelector(selectOperation) === 'init';
  const locations = locationList.map((location) => {
    return { position: [ location.latLng.lat, location.latLng.lng ],
             name: location.name,
             description: location.description,
             timeRange: location.timeRange,
           };
  });
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="app-container">
          <div id="list">
            <List />
          </div>
          <div id="map">
            <MapContainer>
              { locations.length > 0 && (saveOperationMode || deleteOperationMode || initialized) && <MapBounds /> }
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {
                locations.map(function (location, index) {
                  return (
                    <Marker position={location.position} key={index} >
                      <Popup>
                        <strong>{location.name}</strong> <br/> <em>{'('+ location.position[0] + '°, ' + location.position[1] + '°)'}</em> <br/> {location.description} <br/> {location.timeRange}
                      </Popup>
                    </Marker>
                  )
                })
              }
              { selectOperationMode && <FlyToCoords latLng={locationList[selected].latLng} />}
              <LeafletControlGeocoder />
            </MapContainer>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
