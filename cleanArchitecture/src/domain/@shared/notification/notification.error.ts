import { NotificationErrorProperties } from "./notification";

export default class NotificationError extends Error {
    constructor(public errors: NotificationErrorProperties[]) {
        super();
    }
}
