import EmailVerifyTemplate from "./templates/verify.template";
import PasswordResetTemplate from "./templates/password.reset.template";
import PayoutReceiptTemplate from "./templates/payout.template";
import { JTDDataType } from "ajv/dist/core";

export const templates = {
    emailVerify: EmailVerifyTemplate,
    passwordReset: PasswordResetTemplate,
    payoutReceipt: PayoutReceiptTemplate,
};

export type TemplateNames = keyof typeof templates;
export type TemplateProperties<T extends TemplateNames> = typeof templates[T]['schema']['properties'];
export type TemplateConditions<T extends TemplateNames> = typeof templates[T]['conditions']['properties'];

export type TemplateType<T extends TemplateNames> = {
    [K in keyof TemplateProperties<T>]: JTDDataType<TemplateProperties<T>[K]>;
};

export type TemplateConditionsType<T extends TemplateNames> = {
    [K in keyof TemplateConditions<T>]: JTDDataType<TemplateConditions<T>[K]>;
};