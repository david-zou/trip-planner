import React, { useRef } from 'react';
import { List } from './features/list/List';
import {
  selectList,
  selectBounds,
  selectBoundChanged,
  toggleBoundChanged,
  selectSelected,
  selectSelectedChanged,
  selectPreviouslySelected,
  selectPreviousBounds,
  selectOperation,
} from './features/list/listSlice';
// import {
//   selectModalOperation,
// } from './features/listModal/listModalSlice'
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import './App.css';

function MapBounds () {
  const dispatch = useDispatch();
  const map = useMap();
  const bounds = useSelector(selectBounds);
  // const changedBounds = useSelector(selectBoundChanged);
  // const previousBounds = useSelector(selectPreviousBounds);
  // const initialized = useSelector(selectOperation) === 'init';
  // if ((bounds[0] !== previousBounds[0] && bounds[1] !== previousBounds[1])  || initialized) {
  //   console.log('fitbounds called with bounds:', bounds); 
  //   map.fitBounds(bounds);
  // }
  map.fitBounds(bounds);
  return null;
}

const FlyToCoords = ({ latLng }) => {
  const map = useMap();
  console.log('flyToCoords called, what is latLng?', latLng)
  map.flyTo(latLng, 14, { duration: 2 });
  return null;
}

function App() {
  // TODO: Change position and zoom to be within bounds of marker group(s)
  // Ref(s): https://react-leaflet.js.org/docs/example-view-bounds/
  // https://leafletjs.com/SlavaUkraini/reference.html#latlngbounds
  const locationList = useSelector(selectList);
  const selected = useSelector(selectSelected); // currently selected location
  const previouslySelected = useSelector(selectPreviouslySelected); // check if selected location changed
  const selectOperationMode = useSelector(selectOperation) === 'select';
  const updateOperationMode = useSelector(selectOperation) === 'update';
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

  // console.log('what is locations now?:', locations);
  // console.log('what is selected:', selected);
  // console.log('what is previously selected:', previouslySelected);

  // if (locations.length === 0) {
  //   locations = [{
  //     position: [ 37.7749, -122.4194],
  //     description: "San Francisco, CA",
  //     timeRange: "N/A",
  //   }]
  // }
  // const mapBounds = latLngBounds(useSelector(selectList).map((location) => {
  //   return [ location.latLng.lat, location.latLng.lng ];
  // }));
  // const [bounds, setBounds] = useState(mapBounds);
  console.log('will MapBounds render?', locations.length > 0 && (saveOperationMode || initialized));
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="app-container">
          <div id="list">
            <List />
          </div>
          <div id="map">
            {/* <MapContainer center={position} zoom={13}> */}
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
                        <strong>{location.name}</strong> <br/> {location.description} <br/> {location.timeRange}
                      </Popup>
                    </Marker>
                  )
                })
              }
              { selectOperationMode && <FlyToCoords latLng={locationList[selected].latLng} /> }
            </MapContainer>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
