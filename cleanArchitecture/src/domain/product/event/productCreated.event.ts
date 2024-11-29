import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {
    dateTime: Date;
    eventData: any;

    constructor (eventData: any) {
        this.dateTime = new Date();
        this.eventData = eventData;
    }
}
