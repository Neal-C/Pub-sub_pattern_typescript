import { createSubscribable } from "./Subscribable-function";

const sub = createSubscribable<string>();
const unsub = sub.suscribe(console.log);
sub.publish("goodbye"); //prints
sub.publish("hi 👋, if you made it here: hire me"); //prints
unsub();
sub.publish("mars"); //nothing

//npx ts-node Subscribable-function-test.ts