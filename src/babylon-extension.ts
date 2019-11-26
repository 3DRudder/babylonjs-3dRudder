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
import { Scene, FreeCamera, Matrix, Vector3, Vector2, Nullable, ICameraInput, CameraInputTypes, Observable } from 'babylonjs';
// import 3dRudder SDK
import * as Sdk3dRudder from '3drudder-js';

export class FreeCamera3dRudderInput implements ICameraInput<FreeCamera> {
    camera: FreeCamera;        

    public port = 0;
    public speedRotation = 0.1;
    public speedTranslation: Vector3 = Vector3.One();
    onConnected: Observable<boolean> = new BABYLON.Observable<boolean>();
    onDiscovery: Observable<any> = new BABYLON.Observable<any>();

    private _cameraTransform: Matrix = Matrix.Identity();
    private _deltaTransform: Vector3 = Vector3.Zero();
    private _vector3: Vector3 = Vector3.Zero();
    private _vector2: Vector2 = Vector2.Zero();        
    private SDK: any;

    constructor (config: any) {
        this.SDK = new Sdk3dRudder(config);
    }

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
            this._vector3.copyFromFloats(controller.axis.leftright * speed.x, controller.axis.updown * speed.y, controller.axis.forwardbackward * speed.z);

            Vector3.TransformCoordinatesToRef(this._vector3, this._cameraTransform, this._deltaTransform);
            camera.cameraDirection.addInPlace(this._deltaTransform);
            this._vector2.copyFromFloats(0, controller.axis.rotation * this.speedRotation)
            camera.cameraRotation.addInPlace(this._vector2);
        }
    }
    
    connect(url: string) {
            this.SDK.host = url;
            this.SDK.init();
    }

    attachControl(element : HTMLElement, noPreventDefault?: boolean) {        
        this.SDK.init();
        this.SDK.on('connectedDevice', (device: any) => {
            this.onConnected.notifyObservers(device.connected);
        });
        this.SDK.on('discovery', (urls: any) => {
            this.onDiscovery.notifyObservers(urls);
        });      
    }

    detachControl(element: Nullable<HTMLElement>) {
        this.SDK.stop();
    }

    setAxesParam(axesParam) {
        var controller = this.SDK.controllers[this.port];
        if (controller.connected){
            controller.setAxesParam(axesParam);
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