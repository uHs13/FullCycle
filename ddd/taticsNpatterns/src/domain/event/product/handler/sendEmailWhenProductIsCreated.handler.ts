import EventInterface from "../../@shared/event.interface";
import EventHandlerInterface from "../../@shared/eventHandler.interface";

export default class SendEmailWhenProductIsCreatedHandler
    implements EventHandlerInterface
{
    handle(event: EventInterface): void {
        console.log('Sending email...');
    }
}
