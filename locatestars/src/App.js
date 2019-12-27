import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let alertMessage = function (e) {
    //alert('clicked on box!');
  }

  return (
    <div>
      <a-scene /* embedded */ vr-mode-ui='false' arjs='sourceType: webcam; debugUIEnabled: false' fog="type: linear; color: #AAA">
        <a-assets>
          <img crossOrigin="anonymous" id="boxTexture" src="https://image.flaticon.com/icons/png/512/2230/2230346.png" />
          <img crossOrigin="anonymous" id="prayermatTexture" src="https://image.flaticon.com/icons/png/512/1197/1197998.png" />
        </a-assets>
        <a-box onClick={alertMessage}
          gps-entity-place="latitude: 21.422487; longitude: 39.826206;"
          /* gps-entity-place="latitude: 3.125351; longitude: 101.472123;" */
          src="#boxTexture"
          /* rotation="0 5 5" */
          /* position="0 1.25 -15" */
          scale="6 6 18"
          /* animation="property: object3D.position.y; to: 2.2; dir: alternate; dur: 1000; loop: true" */>
        </a-box>
        <a-camera gps-camera="minDistance: 0;" rotation-reader>
          <a-cursor>
            <a-image width="0.17" height="0.1" src="#prayermatTexture"></a-image>
          </a-cursor>
        </a-camera>
      </a-scene>
    </div>
  );
}

export default App;
