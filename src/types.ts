import { TemplateNames } from "./templates";

export type emailType = {
    senderEmail: string;
    appname: string;
    html: string;
    subject: string;
    receiverEmails: { email: string }[];
    plaintext: string;
    beforeEmail?: () => void;
    afterEmail?: () => void;
};

export type templateType = {
    senderEmail: string;
    subject: string;
    receiverEmails: { email: string }[];
    template: string;
    plaintext: string;
    config: object;
    conditions: any;
};

export interface singleTemplateType {
    template: (obj: any) => string;
    plaintext: (obj: any) => string;
    schema: object;
    name: TemplateNames;
};