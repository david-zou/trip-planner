import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { List } from './features/list/List';
import L from 'leaflet';
import { Map, MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './App.css';
import 'leaflet/dist/leaflet.css';

// const myMap = L.map('map', {
//   center: [37.7749, -122.4194],
//    zoom: 13
//  })
// import db from './firebase.js';
// import { collection , onSnapshot } from 'firebase/firestore';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <Counter /> */}
        <div className="app-container">
          <div id="list">
            <List />
          </div>
          <div id="map">
            <MapContainer center={[51.505, -0.09]} zoom={13}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
        {/* <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span> */}
      </header>
    </div>
  );
}

export default App;
