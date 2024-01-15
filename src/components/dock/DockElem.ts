import { Container, Graphics } from 'pixi.js';
import { Destination, GameObject } from '../interfaces';
import Ship from '../ships/Ship';

export default class DockElem implements GameObject {
  private static _height: number = 100;
  private static _width: number = 40;

  private _id: number;
  private _container!: Container
  private fulled: boolean = false;
  private free: boolean = true;

  private destinationX: number
  private destinationY: number

  constructor (index: number) {
    this._id = index;

    this.createContainer(index);

    this.destinationX = DockElem.width + 10;
    this.destinationY = (this._container.y + DockElem.height / 2) - Ship.height / 2;
  }

  private createContainer(index: number): void {
    this._container = new Container();
    this._container.position.set(0, index * 110);
  }

  private createBorders = (): Graphics => {
    const dock = new Graphics();
    
    this.fulled ? dock.beginFill(0xFFFF00, 1) : dock.lineStyle(5, 0xFFFF00);
    dock.drawRect(0, 0, DockElem._width, DockElem._height);
    dock.endFill();

    return dock;
  } 

  public createObject = (): Container => {
    this.createContainer(this._id);

    this._container.addChild(this.createBorders());
    return this._container;
  }

  public get isFulled(): boolean {
    return this.fulled;
  }

  public get destionation(): Destination {
    return {
      destinationX: this.destinationX, 
      destinationY: this.destinationY
    }
  }

  public static get width(): number {
    return DockElem._width;
  }
  public static get height(): number {
    return DockElem._height;
  }

  public get isFree(): boolean {
    return this.free;
  }

  public get container() {
    return this._container;
  }

  public setIsFulled(): void {
    this.fulled = !this.fulled;
  }

  public setIsFree(): void {
    this.free = !this.free;
  }



  // public createPier(index: number): void {
  //   this.graphic = this.setGraphic(index);
  //   this.container.position.set(0, index * 110);
  //   this.container.addChild(this.graphic);
  // }
}