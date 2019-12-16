![license](https://img.shields.io/github/license/mashape/apistatus.svg)
![language](https://img.shields.io/badge/Language-javascript-green.svg) 
![Node.js](https://img.shields.io/badge/Node.js-v8.9.1-green.svg)
![BabylonJS](https://img.shields.io/badge/BabylonJS-v3.2.0-green.svg)

# BabylonJS 3dRudder extension v1.0.7
* 3dRudder-js version 2.0.6

## Usage
```npm install babylonjs-3drudder```
```javascript
import * as BABYLON3dRudder from 'babylonjs-3drudder';
var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-5), scene);
// add 3dRudder input to move the camera
var input3dRudder = new BABYLON3dRudder.FreeCamera3dRudderInput();
camera.inputs.add(input3dRudder);
camera.inertia = 0;
input3dRudder.speedTranslation = new BABYLON.Vector3(0.5,0.1,1);
input3dRudder.speedRotation = 0.05;
// attach the camera to the canvas
camera.attachControl(canvas, false);
```
* Use discovery
```javascript
var input3dRudder = new BABYLON3dRudder.FreeCamera3dRudderInput({"schemeWs":"ws", "discovery": true});
input3dRudder.onDiscovery.add((urls) => {
    if (urls.length > 0) {
        input3dRudder.connect(urls[0].ip);                        
    } else {
        console.log("no servers found");
    }
});
```

## Build for browser
* ```npm install```
* ```npm run build```

## Sample
* [FreeCamera](/examples/babylon.html)
* [PlayGround](https://playground.babylonjs.com/#ZUADV9#6)