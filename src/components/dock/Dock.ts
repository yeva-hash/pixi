import { Container } from 'pixi.js';
import DockElem from './DockElem';
import {GameObject } from '../interfaces';
import emmiter from '../../utils/EventEmmiter';

export default class Dock implements GameObject {
    private container: Container;
    private _docksElements!: DockElem[];

    private numberOfElements: number = 4
    constructor() {
        this.container = new Container();
        this.initializeComponents();
        this.attachListeners();
    }

    private attachListeners = () => {
        emmiter.on('arrival', this.handleCargo.bind(this));
    } 

    private handleCargo = (targetDock: DockElem | undefined) => {
        if (targetDock) {
            targetDock.container.destroy(true);
            targetDock.setIsFulled();
            
            this.container.addChild(targetDock.createObject());
        }
    }  

    private initializeComponents = () => {
        this._docksElements = Array.from({ length: this.numberOfElements }, (_, i) => new DockElem(i));
    }

    public createObject = (): Container => {
        this._docksElements.forEach((object) => {
          const container = object.createObject();
          this.container.addChild(container);
        })

        return this.container;
    }

    public getElements(): DockElem[] {
        return this._docksElements;
    }
}