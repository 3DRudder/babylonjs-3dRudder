![license](https://img.shields.io/github/license/mashape/apistatus.svg)
![language](https://img.shields.io/badge/Language-javascript-green.svg) 
![Node.js](https://img.shields.io/badge/Node.js-v8.9.1-green.svg)
![BabylonJS](https://img.shields.io/badge/BabylonJS-v3.2.0-green.svg)

# BabylonJS 3dRudder extension
## Usage
```javascript
var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-5), scene);
// add 3dRudder input to move the camera
camera.inputs.add(new BABYLON3dRudder.FreeCamera3dRudderInput());
// attach the camera to the canvas
camera.attachControl(canvas, false);
```

## Build for browser
* ```npm install```
* ```npm run build```

## Sample
* [FreeCamera](/examples/babylon.html)