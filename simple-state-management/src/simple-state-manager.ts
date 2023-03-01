import { useEffect, useState } from "react";

function createSubscribable<MessageType>() {

    //it's a closure that maintains its own subscribers' list;
    //so it can modify it but it's not open to the caller
    //caller can modify it directly
    //caller must go through our API
	const subscribers: Set<(msg: MessageType) => void> = new Set();

	return {
		subscribe(callback: (msg: MessageType) => void): () => void {
			subscribers.add(callback);

			return () => {
				subscribers.delete(callback);
			};
		},
		publish(msg: MessageType): void {
			subscribers.forEach((callback) => {
				callback(msg);
			});
		},
	};
}

export function createStateHook<DataType>(initialValue: DataType): () => [DataType, (value: DataType) => void] {

    const subscribers = createSubscribable<DataType>();

    return () => {

        const [value, setValue] = useState<DataType>(initialValue);
        
        useEffect(() => {
            return subscribers.subscribe(setValue);
        },[])

        return [value, (v: DataType) => {
            setValue(v);
            subscribers.publish(v)
        }];
    }

}
