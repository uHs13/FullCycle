import Notification from "./notification";

describe('Notification unit tests', () => {
    it('Should create errors', () => {
        const notification = new Notification();

        const error = {
            message: 'message',
            context: 'customer'
        };

        notification.addError(error);

        let errorString = 'customer: message,';
        expect(notification.listMessages(error.context)).toBe(errorString);

        const errorTwo = {
            message: 'message two',
            context: 'customer'
        };

        notification.addError(errorTwo);

        errorString = 'customer: message,customer: message two,';
        expect(notification.listMessages(errorTwo.context)).toBe(errorString);

        const errorThree = {
            message: 'message three',
            context: 'order'
        };

        notification.addError(errorThree);

        errorString = 'customer: message,customer: message two,';
        expect(notification.listMessages(error.context)).toBe(errorString);

        errorString = 'customer: message,customer: message two,order: message three,';
        expect(notification.listMessages()).toBe(errorString);
    });

    it('Should check if notification has errors', () => {
        const notification = new Notification();

        const error = {
            message: 'message',
            context: 'customer'
        };

        notification.addError(error);

        expect(notification.hasErrors()).toBe(true);
    });

    it('Should return all errors', () => {
        const notification = new Notification();

        const error = {
            message: 'message',
            context: 'customer'
        };

        notification.addError(error);

        expect(notification.getErrors()).toEqual([error]);
    });

    it('Should clear all errors', () => {
        const notification = new Notification();

        const error = {
            message: 'message',
            context: 'customer'
        };

        notification.addError(error);
        notification.clearErrors()

        expect(notification.getErrors()).toEqual([]);
    });
});
