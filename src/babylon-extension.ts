// import all babylon
import { Scene, FreeCamera, Matrix, Vector3, Vector2, Nullable, ICameraInput, CameraInputTypes } from 'babylonjs';
//import * as BABYLON from 'babylonjs';
// import 3dRudder SDK
var SDK = require('3drudder-js');

module BABYLONX {
    export class Free3dRudderCamera extends FreeCamera {
        
        constructor(name: string, position: Vector3, scene: Scene) {
            super(name, position, scene);
            this.inputs.add(new FreeCamera3dRudderInput());
        }        

        public getClassName(): string {
            return "Free3dRudderCamera";
        }
    }

    export class FreeCamera3dRudderInput implements ICameraInput<FreeCamera> {
        camera: FreeCamera;        

        public port = 0;
        public speedRotation = 0.01;
        public speedTranslation = 0.1;

        private _cameraTransform: Matrix = Matrix.Identity();
        private _deltaTransform: Vector3 = Vector3.Zero();
        private _vector3: Vector3 = Vector3.Zero();
        private _vector2: Vector2 = Vector2.Zero();

        public checkInputs() {
            var controller = SDK.controllers[this.port];
            if (controller.connected){
                var camera = this.camera;
                var pitch = controller.axis.pitch;
                if (!camera.rotationQuaternion) {
                    Matrix.RotationYawPitchRollToRef(camera.rotation.y, camera.rotation.x, 0, this._cameraTransform);
                } else {
                    camera.rotationQuaternion.toRotationMatrix(this._cameraTransform);
                }

                var speed = this.speedTranslation;
                this._vector3.copyFromFloats(controller.axis.roll * speed, controller.axis.updown * speed, -controller.axis.pitch * speed);

                Vector3.TransformCoordinatesToRef(this._vector3, this._cameraTransform, this._deltaTransform);
                camera.cameraDirection.addInPlace(this._deltaTransform);
                this._vector2.copyFromFloats(0, controller.axis.yaw * this.speedRotation)
                camera.cameraRotation.addInPlace(this._vector2);
            }
        }
        
        attachControl(element : HTMLElement, noPreventDefault?: boolean) {
            SDK.init();
        }

        detachControl(element: Nullable<HTMLElement>) {
            SDK.stop();
        }

        getClassName(): string {
            return "FreeCamera3dRudderInput";
        }
        
        getSimpleName(){
            return "3dRudderInput";
        }
    }
    
    (<any>CameraInputTypes)["FreeCamera3dRudderInput"] = FreeCamera3dRudderInput;
}