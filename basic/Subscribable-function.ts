export function createSubscribable<MessageType>() {

    //it's a closure that maintains its own subscribers' list;
    //so it can modify it but it's not open to the caller
    //caller can modify it directly
    //caller must go through our API
	const suscribers: Set<(msg: MessageType) => void> = new Set();

	return {
		suscribe(callback: (msg: MessageType) => void): () => void {
			suscribers.add(callback);

			return () => {
				suscribers.delete(callback);
			};
		},
		publish(msg: MessageType): void {
			suscribers.forEach((callback) => {
				callback(msg);
			});
		},
	};
}
