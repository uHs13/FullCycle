import EventInterface from "./event.interface";
import EventHandlerInterface from "./eventHandler.interface";

export default interface EventDispatcherInterface {
    notify(event: EventInterface): void;
    register(eventName: string, eventHandler: EventHandlerInterface): void;
    remove(eventName: string, eventHandler: EventHandlerInterface): void;
    removeAll(): void;
}
