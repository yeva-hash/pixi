import { Container } from 'pixi.js';
import { GameObject } from '../components/interfaces';
import Port from '../components/port/Port';
import Dock from '../components/dock/Dock';
import Ship from '../components/ships/Ship';
import ShipQueue from '../components/ships/ShipQueue';

export class GameScene extends Container {
    private port!: Port
    private dock!: Dock
    private queue!: ShipQueue
    private gameObjects!: GameObject[]
    constructor() {
    super();
        this.initializeComponents();
        this.addGameElements();
        this.startGame(); 
    }

    private initializeComponents(): void {
        this.gameObjects = [
            this.port = new Port(),
            this.dock = new Dock(),
            this.queue = new ShipQueue(this.port, this.dock)
        ]
    }

    private createShip = async() => {
        const ship = new Ship();
        this.addChild(ship.createObject());

        ship.runShip(this.port, this.dock, this.queue);
    }

    private startGame(): void {
        this.createShip();
    
        setInterval(() => {
            this.createShip();
        }, 8000)
    }
 
    private addGameElements(): void {
        this.gameObjects.forEach((object) => {
            const container = object.createObject();
            this.addChild(container);
        })
    }
}
