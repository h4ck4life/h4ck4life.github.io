import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let alertMessage = function (e) {
    alert('clicked on box!');
  }

  return (
    <div>
      <a-scene /* embedded */ vr-mode-ui='false' arjs='sourceType: webcam; debugUIEnabled: false' fog="type: linear; color: #AAA">
        <a-assets>
          <img crossOrigin="anonymous" id="boxTexture" src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Logo_of_Petron.svg" />
        </a-assets>
        <a-box onClick={alertMessage} gps-entity-place="latitude: 3.125351; longitude: 101.472123;" src="#boxTexture" rotation="0 45 45" /* position="0 1.25 -15" */ scale="25 25 125" color="#EF2D5E" animation="property: object3D.position.y; to: 2.2; dir: alternate; dur: 1000; loop: true"></a-box>
        <a-camera gps-camera rotation-reader>
          {/* <a-cursor></a-cursor> */}
        </a-camera>
      </a-scene>
    </div>
  );
}

export default App;
