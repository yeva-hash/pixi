import { Container } from "pixi.js";

export interface GameObject {
    createObject(): Container
}

export interface Destination {
    destinationX: number;
    destinationY: number;
}