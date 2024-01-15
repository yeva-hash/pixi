import * as TWEEN from '@tweenjs/tween.js';
import { Container, Graphics } from "pixi.js";
import { GameObject } from "../interfaces";
import { Manager } from "../../Manager";
import Port from "../port/Port";
import Animation from '../../utils/Animation';
import Dock from "../dock/Dock";
import DockElem from "../dock/DockElem";
import emmiter from '../../utils/EventEmmiter';
import ShipQueue from './ShipQueue';

export default class Ship implements GameObject {
    private static _height: number = 50;
    private static _width: number = 100;

    private _container!: Container;
    private _targetDock!: DockElem | undefined;

    constructor(
        private startX: number = Manager.width - Ship.width,
        private startY: number = Manager.height / 2 - Ship.height,
        private fulled: boolean = !!Math.round(Math.random())
    ) { this.attachListeners() }

    private attachListeners = () => {
        emmiter.on('arrival', this.handleCargo.bind(this));
    }

    public runShip = async (port: Port, dock: Dock, queue: ShipQueue): Promise<void> => {
        this._targetDock = this.findTargetDock(dock);

        if (this._targetDock) {
            this._targetDock.setIsFree(); 

            await this.goToPort(port);
            await this.goToDock(this._targetDock);
    
            setTimeout(() => {
                emmiter.emit('arrival', this._targetDock)
                
                this.goBackAndDestroy(port);
                emmiter.emit('freeDock', this._targetDock);
            }, 5000)
        }
        else {
            const { destinationX, destinationY } = queue.getQueueDestination(this);
            await Animation.go(this._container, {destinationX, destinationY}, 2000);
        }
    }


    private goBackAndDestroy = async(port: Port) => {
        await this.goToPort(port);
        await Animation.go(this._container, {destinationX: Manager.width, destinationY: Manager.height - Ship.width}, 3000);
        this._container.destroy(true);
    }

    private handleCargo = (targetDock: DockElem) => {
        if (this._targetDock === targetDock && !targetDock.isFree) {
            this._container.removeChildren();
        
            this.fulled = !this.fulled;
            this.createObject();

            this._targetDock.setIsFree();
        }
    }

    private goToPort = async(port: Port): Promise<TWEEN.Tween<{ x: number, y: number }>>  => {
        const { destinationX, destinationY } = port.destionation;
        return Animation.go(this._container, {destinationX, destinationY}, 3000);
    }

    private goToDock = async(targetDock: DockElem): Promise<TWEEN.Tween<{ x: number, y: number }> | undefined>  => {
        let { destinationX, destinationY } = targetDock.destionation;
        return Animation.go(this._container, {destinationX, destinationY}, 3000);   
    }

    private findTargetDock = (dock: Dock): DockElem | undefined => {
        return this._targetDock = dock.getElements().find((dockElem) => {
            return (dockElem.isFulled !== this.fulled) && dockElem.isFree;
        });
    }

    private createBorders = (): Graphics => {
        const ship = new Graphics();
        
        this.fulled ? ship.beginFill(0xFF0000, 1) : ship.lineStyle(5, 0x00FF00);
        
        ship.drawRect(0, 0, Ship.width, Ship.height);
        ship.endFill();
        return ship;
    }

    public createObject = (): Container => {
        if (!this._container) {
            this._container = new Container();
            this._container.position.set(this.startX, this.startY);
        }
        this._container.addChild(this.createBorders());

        return this._container;
    }

    public get container(): Container {
        return this._container;
    }

    public get isFulled(): boolean {
        return this.fulled;
    }

    public static get width(): number {
        return Ship._width;
    }

    public static get height(): number {
        return Ship._height;
    }
}