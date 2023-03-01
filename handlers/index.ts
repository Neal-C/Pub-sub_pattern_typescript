import fs from "fs";


//*Also often called : chain of responsabilities pattern;

type Output = undefined | unknown;

export function createHandlerStack<MessageType>() {
	//it's a closure that maintains its own subscribers' list;
	//so it can modify it but it's not open to the caller
	//caller can modify it directly
	//caller must go through our API
	const subscribers: Set<(msg: MessageType) => Output> = new Set();

	return {
		suscribe(callback: (msg: MessageType) => Output): () => void {
			subscribers.add(callback);

			return () => {
				subscribers.delete(callback);
			};
		},
		publish(msg: MessageType): Output {
			let data: unknown;
			for (const subscriber of Array.from(subscribers)) {
				data = subscriber(msg);
				if (data !== undefined) {
					break;
				}
			}
			return data;
		},
	};
}

const handlers = createHandlerStack<{ name: string, contents: string}>();

handlers.suscribe(({contents}) => {
    return contents;
});

handlers.suscribe(({name, contents}) => {
    if(name.endsWith(".json")){
        return JSON.parse(contents);
    }
})

for (const name of fs.readdirSync("./files")){
    const contents = fs.readFileSync(`./files/${name}`, "utf-8");
    const output = handlers.publish({name, contents});
    console.log(`${name} : ${JSON.stringify(output)}`);
}

//npx ts-node index.ts

