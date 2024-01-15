
import { Container, Graphics } from "pixi.js";
import { GameObject } from "../interfaces";

export default class PortElem implements GameObject {
    public container!: Container;

    private static _height: number = 480 * 0.25;
    private static _width: number = 5;

    constructor(private x: number, private y: number) {}

    public createBorders = (): Graphics => {
        const line = new Graphics();
        line.beginFill(0xFFFF00, 1).drawRect(this.x, this.y, PortElem.width, PortElem.height).endFill();
        return line;
    }

    public createObject = (): Container => {
        this.container = new Container();

        this.container.addChild(this.createBorders());
        return this.container;
    }

    
    public static get width(): number {
        return PortElem._width;
    }
    public static get height(): number {
        return PortElem._height;
    }
} 