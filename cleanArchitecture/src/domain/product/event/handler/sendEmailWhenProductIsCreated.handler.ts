import EventInterface from "../../../@shared/event/event.interface";
import EventHandlerInterface from "../../../@shared/event/eventHandler.interface";

export default class SendEmailWhenProductIsCreatedHandler
    implements EventHandlerInterface
{
    handle(event: EventInterface): void {
        console.log('Sending email...');
    }
}
