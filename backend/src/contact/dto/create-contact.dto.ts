export class CreateContactDto {
    name: string;
    email: string;
    subject?: string;
    message?: string;
    appName?: string;
    duration?: string;
    budget?: string;
    type: string;
}
