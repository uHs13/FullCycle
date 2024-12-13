import Notification from "../notification/notification";
import NotificationError from "../notification/notification.error";

export default abstract class Entity {
    public notification: Notification;

    constructor() {
        this.notification = new Notification();
    }

    public throwErrors(): void {
        if (this.notification.hasErrors()) {
            const errors = this.notification.getErrors();

            this.notification.clearErrors();

            throw new NotificationError(errors);
        }
    }
}
