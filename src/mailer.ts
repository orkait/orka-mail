import SibApiV3Sdk from "sib-api-v3-typescript";
import { emailType, singleTemplateType } from "./types";
import { bindTemplate } from "./index";
import { TemplateNames } from "./templates";
import dotenv from "dotenv";
dotenv.config();

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const mailer = async (config: emailType, html: string, plaintext: string) => {
    const apiKey = String(process.env.SIB_API_KEY);
    if (!apiKey) {
        throw new Error("Sib Api Key is not defined");
    }

    apiInstance.setDefaultAuthentication(
        new SibApiV3Sdk.ApiKeyAuth("api-key", apiKey)
    );


    console.log("API KEY", apiKey)

    const sendSmtpEmail = {
        sender: {
            email: config.senderEmail,
            name: config.appname,
        },
        to: config.receiverEmails,
        subject: config.subject,
        htmlContent: html,
        plaintext: plaintext,
    };

    try {
        if (config.beforeEmail) {
            config.beforeEmail();
        }
        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

        if (config.afterEmail) {
            config.afterEmail();
        }
        return {
            message: "mail has been processed",
            data: result,
            status: "success",
        };
    } catch (error) {
        return {
            message: "mail sending failed",
            status: "failed",
            data: {},
        };
    }
};

const sendMailSendInBlue = async (templateName: TemplateNames, data: any, conditions: any) => {
    const verifyMail = bindTemplate(templateName)(data, conditions);

    const result = await mailer(
        {
            senderEmail: "mewaconite@gmail.com",
            appname: "Pastekey",
            html: "",
            subject: "Verify your email",
            receiverEmails: [
                {
                    email: "kailashmahavarkar5@gmail.com",
                },
            ],
            plaintext: "",
        },
        verifyMail.html,
        verifyMail.plaintext
    );

    return result;
}


sendMailSendInBlue("emailVerify", {
    "company": "123",
    "href": "https://google.com",
    "username": "kartik",
}, {}).then((res) => {
    // console.log(res);
}
).catch((err) => {
    // console.log("error -->", err);
});

export default sendMailSendInBlue;