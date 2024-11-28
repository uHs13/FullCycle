import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/sendEmailWhenProductIsCreated.handler";
import ProductCreatedEvent from "../../product/event/productCreated.event";
import EventDispatcher from "./eventDispatcher";

describe('Domain Event tests', () => {
    it('Should properly register an event', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);
    });

    it('Should properly remove an event', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        eventDispatcher.remove('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0);
    });

    it('Should properly remove all events', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        eventDispatcher.removeAll();

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined();
    });

    it('Should properly notify all events', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, 'handle');

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: 'Product name',
            price: 13
        });

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
});
