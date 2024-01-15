import { Container } from "pixi.js";
import Ship from "./Ship";
import { Destination, GameObject } from "../interfaces";
import { Manager } from "../../Manager";
import PortElem from "../port/PortElem";
import emmiter from "../../utils/EventEmmiter";
import Port from "../port/Port";
import Dock from "../dock/Dock";
import DockElem from "../dock/DockElem";
import Animation from '../../utils/Animation';

export default class ShipQueue extends Container implements GameObject {
    private fullShips: Ship[] = [];
    private emptyShips: Ship[] = [];

    private destinationX: number = Manager.width * 0.3 + 10;
    private fullQueueY = Manager.height - PortElem.height + Ship.height / 2;
    private emptyQueueY = PortElem.height - Ship.height * 2;
    
    constructor(private port: Port, private dock: Dock) {
        super();
        this.attachListeners()
    }

    private attachListeners(): void {
        emmiter.on('freeDock', this.sendShip.bind(this))
    }
    
    private sendShip = (targetDock:DockElem): void => {
        const targetShip = targetDock.isFulled ? this.emptyShips.shift(): this.fullShips.shift();
        if (targetShip) {
            targetShip.runShip(this.port, this.dock, this);
            this.updateQueueArray();
        }
    }

    private updateQueueArray = () => {
        const allShips = [...this.fullShips, ...this.emptyShips];

        allShips.forEach((ship, index) => {
            const newDestinationX = this.destinationX + index * (Ship.width + 10);
            const newDestinationY = ship.isFulled ? this.fullQueueY : this.emptyQueueY;
    
            Animation.go(ship.container, { destinationX: newDestinationX, destinationY: newDestinationY }, 1000);
        });
    
    }
    
    public getQueueDestination = (ship: Ship): Destination => {
        const index = ship.isFulled ? this.fullShips.push(ship) : this.emptyShips.push(ship);
    
        return {
            destinationX: this.destinationX + (index - 1) * Ship.width,
            destinationY: ship.isFulled ? this.fullQueueY : this.emptyQueueY
        }
    }

    public createObject = ():Container => {
        return this;
    }
}