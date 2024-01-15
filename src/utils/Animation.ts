import * as TWEEN from '@tweenjs/tween.js';
import { Destination } from '../components/interfaces';
import { Container } from 'pixi.js';

class Animation {
    private static instance: Animation;
    
    public static getInstance(): Animation {
        if (!Animation.instance) {
            Animation.instance = new Animation();
        }
        return Animation.instance;
    }

    public async go(
        targetContainer: Container,
        to: Destination,
        duration: number,
    ): Promise<TWEEN.Tween<{ x: number, y: number }>> {
        return new Promise((resolve) => {
            const { destinationX, destinationY } = to;
            const tween = new TWEEN.Tween({ x: targetContainer.x, y: targetContainer.y })
                .to({ x: destinationX, y: destinationY }, duration)
                .onUpdate((obj) => {
                    Object.assign(targetContainer, obj);
                })
                .onComplete(() => {
                    tween.stop();
                    resolve(tween);
                })
                .start();
        });
    }

    public startAnimationLoop(): void {
        const animate = () => {
            requestAnimationFrame(animate);
            TWEEN.update();
        };

        animate();
    }
}

export default Animation.getInstance();