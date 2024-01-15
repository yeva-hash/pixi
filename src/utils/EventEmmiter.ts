class EventEmitter {
    private static instance: EventEmitter;
    private events: Record<string, ((...args: any) => any)[]> = {};

    public static getInstance(): EventEmitter {
        if (!EventEmitter.instance) {
            EventEmitter.instance = new EventEmitter();
        }
        return EventEmitter.instance;
    }
      
    public on(eventName:string, callback: (...args: any | undefined) => any):void {
        !this.events[eventName] && (this.events[eventName] = []);
        this.events[eventName].push(callback);
    }
    public removeOn(eventName: string, callback: (...args: any | undefined) => any):void {
        this.events[eventName] = this.events[eventName].filter(eventCallback => callback !== eventCallback);
    }

    public emit (eventName: string, ...args: any | undefined):void {
        const event = this.events[eventName];
        event && event.forEach(callback => callback.call(this, ...args));
    }
}

export default EventEmitter.getInstance();
