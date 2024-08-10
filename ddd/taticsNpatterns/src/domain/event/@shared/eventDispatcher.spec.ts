describe('Domain Event tests', () => {
    it('Should properly register an event', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEventHandler']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['ProductCreatedHandler'].length).toBe(1);
    });
});
