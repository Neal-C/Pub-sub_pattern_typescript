import { DataClass, Subscribable } from "./Subscribable-class";

const sub = new Subscribable<string>();
const unsub = sub.suscribe(console.log);
sub.publish("goodbye"); //prints
sub.publish("hi 👋, if you made it here: hire me"); //prints
unsub();
sub.publish("mars"); //nothing

//npx ts-node Subscribable-class-test.ts

const dataclass = new DataClass(0);
const dataclassUnsub = dataclass.suscribe((v) => console.log(`Data class : ${v}`));
const dataclassUnsub2 = dataclass.suscribe((v) => console.log(`Data class : ${v}`));

dataclass.setValue(42);
dataclassUnsub();
dataclassUnsub2();