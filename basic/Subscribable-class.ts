export class Subscribable<MessageType> {
    private suscribers : Set<(msg: MessageType) => void> = new Set();
    constructor(){
        //
    }

    suscribe(callback: (msg: MessageType) => void): () => void {

        this.suscribers.add(callback)

        return () => {
            this.suscribers.delete(callback);
        };
    }

    publish(msg: MessageType) :void {
        this.suscribers.forEach((callback) => {
            callback(msg);
        })
    }
}

export class DataClass extends Subscribable<number> {
    constructor(public value:number){
        super();
    };

    setValue(value: number){
        this.value = value;
        this.publish(value);
    }
}

