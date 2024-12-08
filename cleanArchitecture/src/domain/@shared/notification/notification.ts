export type NotificationErrorProperties = {
    message: string;
    context: string;
};

export default class Notification {
    private errors: NotificationErrorProperties[] = [];

    public getErrors(): NotificationErrorProperties[] {
        return this.errors;
    }

    public addError(error: NotificationErrorProperties) {
        this.errors.push(error);
    }

    public listMessages(context?: string): string {
        let message = '';

        this.errors.forEach(error => {
            if (context === undefined || error.context === context) {
                message += `${error.context}: ${error.message},`;
            }
        });

        return message;
    }

    public hasErrors(): boolean {
        return this.errors.length > 0;
    }
}
