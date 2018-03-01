/*!
 * 
 * FreeCamera3dRudderInput v1.0.0                                                  
 * https://github.com/3DRudder/babylonjs-3dRudder
 *                                                                             
 * Copyright 2017 3dRudder, Inc. and other contributors                      
 * Released under the MIT license                                     
 * https://github.com/3DRudder/babylonjs-3dRudder/blob/master/LICENSE                 
*/

// import all babylon
import { Scene, FreeCamera, Matrix, Vector3, Vector2, Nullable, ICameraInput, CameraInputTypes } from 'babylonjs';
// import 3dRudder SDK
import * as Sdk3dRudder from '3drudder-js';

export class FreeCamera3dRudderInput implements ICameraInput<FreeCamera> {
    camera: FreeCamera;        

    public port = 0;
    public speedRotation = 0.1;
    public speedTranslation: Vector3 = Vector3.One();

    private _cameraTransform: Matrix = Matrix.Identity();
    private _deltaTransform: Vector3 = Vector3.Zero();
    private _vector3: Vector3 = Vector3.Zero();
    private _vector2: Vector2 = Vector2.Zero();        
    private SDK: any = new Sdk3dRudder();

    public checkInputs() {
        var controller = this.SDK.controllers[this.port];
        if (controller.connected){
            var camera = this.camera;                        
            if (!camera.rotationQuaternion) {
                Matrix.RotationYawPitchRollToRef(camera.rotation.y, camera.rotation.x, 0, this._cameraTransform);
            } else {
                camera.rotationQuaternion.toRotationMatrix(this._cameraTransform);
            }

            var speed = this.speedTranslation;
            this._vector3.copyFromFloats(controller.axis.roll * speed.x, controller.axis.updown * speed.y, controller.axis.pitch * speed.z);

            Vector3.TransformCoordinatesToRef(this._vector3, this._cameraTransform, this._deltaTransform);
            camera.cameraDirection.addInPlace(this._deltaTransform);
            this._vector2.copyFromFloats(0, controller.axis.yaw * this.speedRotation)
            camera.cameraRotation.addInPlace(this._vector2);
        }
    }
    
    attachControl(element : HTMLElement, noPreventDefault?: boolean) {
        this.SDK.init();
        this.SDK.on('connectedDevice' , function(device) { 
            var controller = this.controllers[device.port];
            controller.setModeAxis(controller.MODE.curveNonSymmectricalPitch);
            controller.setCurves({
                pitch: {deadzone: 0.1, xSat: 1.0, yMax: 1.0, exp: 2.0},
                roll: {deadzone: 0.1, xSat: 1.0, yMax: 1.0, exp: 2.0},
                yaw: {deadzone: 0.1, xSat: 1.0, yMax: 1.0, exp: 2.0},
                updown: {deadzone: 0.1, xSat: 1.0, yMax: 1.0, exp: 2.0}
            });
        });
    }

    detachControl(element: Nullable<HTMLElement>) {
        this.SDK.stop();
    }

    setModeAxis(mode) {
        var controller = this.SDK.controllers[this.port];
        if (controller.connected){
            controller.setModeAxis(mode);
        }
    }

    setCurves(curves) {
        var controller = this.SDK.controllers[this.port];
        if (controller.connected){
            controller.setCurves(curves);
        }
    }

    getClassName(): string {
        return "FreeCamera3dRudderInput";
    }
    
    getSimpleName(){
        return "3dRudderInput";
    }
}

(<any>CameraInputTypes)["FreeCamera3dRudderInput"] = FreeCamera3dRudderInput;