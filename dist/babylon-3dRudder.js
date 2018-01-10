(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"), require("3drudder-js"));
	else if(typeof define === 'function' && define.amd)
		define("BABYLON3dRudder", ["babylonjs", "3drudder-js"], factory);
	else if(typeof exports === 'object')
		exports["BABYLON3dRudder"] = factory(require("babylonjs"), require("3drudder-js"));
	else
		root["BABYLON3dRudder"] = factory(root["BABYLON"], root["Sdk3dRudder"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// import all babylon
var babylonjs_1 = __webpack_require__(1);
// import 3dRudder SDK
var Sdk3dRudder = __webpack_require__(2);
/*export class Free3dRudderCamera extends FreeCamera {
    
    constructor(name: string, position: Vector3, scene: Scene) {
        super(name, position, scene);
        this.inputs.add(new FreeCamera3dRudderInput());
    }

    public getClassName(): string {
        return "Free3dRudderCamera";
    }
}*/
var FreeCamera3dRudderInput = /** @class */ (function () {
    function FreeCamera3dRudderInput() {
        this.port = 0;
        this.speedRotation = 0.01;
        this.speedTranslation = 0.1;
        this._cameraTransform = babylonjs_1.Matrix.Identity();
        this._deltaTransform = babylonjs_1.Vector3.Zero();
        this._vector3 = babylonjs_1.Vector3.Zero();
        this._vector2 = babylonjs_1.Vector2.Zero();
        this.SDK = new Sdk3dRudder();
    }
    FreeCamera3dRudderInput.prototype.checkInputs = function () {
        var controller = this.SDK.controllers[this.port];
        if (controller.connected) {
            var camera = this.camera;
            var pitch = controller.axis.pitch;
            if (!camera.rotationQuaternion) {
                babylonjs_1.Matrix.RotationYawPitchRollToRef(camera.rotation.y, camera.rotation.x, 0, this._cameraTransform);
            }
            else {
                camera.rotationQuaternion.toRotationMatrix(this._cameraTransform);
            }
            var speed = this.speedTranslation;
            this._vector3.copyFromFloats(controller.axis.roll * speed, controller.axis.updown * speed, -controller.axis.pitch * speed);
            babylonjs_1.Vector3.TransformCoordinatesToRef(this._vector3, this._cameraTransform, this._deltaTransform);
            camera.cameraDirection.addInPlace(this._deltaTransform);
            this._vector2.copyFromFloats(0, controller.axis.yaw * this.speedRotation);
            camera.cameraRotation.addInPlace(this._vector2);
        }
    };
    FreeCamera3dRudderInput.prototype.attachControl = function (element, noPreventDefault) {
        this.SDK.init();
    };
    FreeCamera3dRudderInput.prototype.detachControl = function (element) {
        this.SDK.stop();
    };
    FreeCamera3dRudderInput.prototype.getClassName = function () {
        return "FreeCamera3dRudderInput";
    };
    FreeCamera3dRudderInput.prototype.getSimpleName = function () {
        return "3dRudderInput";
    };
    return FreeCamera3dRudderInput;
}());
exports.FreeCamera3dRudderInput = FreeCamera3dRudderInput;
babylonjs_1.CameraInputTypes["FreeCamera3dRudderInput"] = FreeCamera3dRudderInput;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=babylon-3dRudder.js.map