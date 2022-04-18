import React from 'react';
import { List } from './features/list/List';
import {
  addOne,
  selectList,
  selectBounds,
  selectSelected,
  selectOperation,
  updateOperation,
  updateSelected,
} from './features/list/listSlice';
import {
  updateQueryLatLng,
  updateQueryName,
  selectQueryLatLng,
  selectQueryName,
} from './features/geocoder/geocoderSlice';
import LeafletControlGeocoder from "./features/geocoder/Geocoder";
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { latLngBounds } from 'leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

const MapBounds = () => {
  const map = useMap();
  const bounds = latLngBounds(useSelector(selectBounds));
  map.fitBounds(bounds);
  return null;
}

const FlyToCoords = ({ latLng, zoomlevel, duration }) => {
  const map = useMap();
  map.flyTo(latLng, zoomlevel, { duration: duration });
  return null;
}

function App() {
  // TODO: Change position and zoom to be within bounds of marker group(s)
  // Ref(s): https://react-leaflet.js.org/docs/example-view-bounds/
  // https://leafletjs.com/SlavaUkraini/reference.html#latlngbounds
  const locationList = useSelector(selectList);
  const queryName = useSelector(selectQueryName);
  const queryLatLng = useSelector(selectQueryLatLng);
  const selected = useSelector(selectSelected); // currently selected location
  const selectQueryOperationMode = useSelector(selectOperation) === 'query';
  const selectListOperationMode = useSelector(selectOperation) === 'select';
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
  const dispatch = useDispatch();

  const addLocation = (e) => {
    e.preventDefault();
    const payload = {
      metadata: {
        name: queryName,
        latLng: queryLatLng,
        description: "Insert Description Here",
        timeRange: "Insert Time Range Here",
      }
    }
    dispatch(addOne(payload));
  }

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
                    <Marker position={location.position} key={index} eventHandlers={{
                      click: (e) => {
                          const latLng = {
                            lat: location.position[0],
                            lng: location.position[1]
                          }
                          dispatch(updateQueryName(location.name))
                          dispatch(updateQueryLatLng(latLng))
                          dispatch(updateSelected(index));
                          dispatch(updateOperation('select'));
                        },
                    }}>
                      <Popup>
                        <strong>{location.name}</strong> <br/>
                        <em>{'('+ location.position[0] + '°, ' + location.position[1] + '°)'}</em> <br/>
                        {location.description} <br/>
                        {location.timeRange} <br/>
                        <a href='/' onClick={addLocation}>Add Location to List</a>
                      </Popup>
                    </Marker>
                  )
                })
              }
              { selectListOperationMode && <FlyToCoords latLng={locationList[selected].latLng} zoomlevel={12} duration={1}/>}
              { selectQueryOperationMode && <FlyToCoords latLng={queryLatLng} zoomlevel={12} duration={1}/>}
              <LeafletControlGeocoder />
            </MapContainer>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
