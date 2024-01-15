import { Application } from 'pixi.js';
import { GameScene } from './scenes/GameScene';
import Animation from './utils/Animation';

export class Manager {
  private static app: Application;
  private static _width: number;
  private static _height: number;

  public static get width(): number {
    return Manager._width;
  }
  public static get height(): number {
    return Manager._height;
  }

  public static initialize(width: number, height: number, background: number): void {
    Manager._width = width;
    Manager._height = height;

    Manager.app = new Application({
      view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: background,
      width: width,
      height: height,
    });

    Animation.startAnimationLoop();
    Manager.app.stage.addChild(new GameScene());
  }
}