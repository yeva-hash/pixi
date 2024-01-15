import { Container } from 'pixi.js';
import { Manager } from '../../Manager';
import { Destination, GameObject } from '../interfaces';
import PortElem from './PortElem';

export default class Port implements GameObject {
  private container: Container;
  private portElements!: PortElem[]; 
  
  constructor(
    private lineX: number = 0,
    private topLineY: number = 0,
    private bottomLineY: number = Manager.height - Manager.height * 0.25,
    private _destinationX = Manager.width * 0.3,
    private _destinationY = Manager.height / 2
  ) {
      this.container = new Container();
      this.container.position.set(Manager.width * 0.3, 0);
    
      this.initializeComponents();
    }

  private initializeComponents = () => {
    this.portElements = [
      new PortElem(this.lineX, this.topLineY),
      new PortElem(this.lineX, this.bottomLineY)
    ]
  }

  public createObject = (): Container => {
    this.portElements.forEach((object) => {
      const container = object.createObject();
      this.container.addChild(container);
    })
    return this.container;
  }

  public get destionation(): Destination {
    return {
      destinationX: this._destinationX, 
      destinationY: this._destinationY
    }
  }
}