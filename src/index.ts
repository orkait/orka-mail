import Ajv, { ValidationError } from "ajv";
import { templates } from './templates';
import type { TemplateType, TemplateConditionsType } from "./templates";

const ajv = new Ajv({
    allErrors: true,
});

export function bindTemplate<T extends keyof typeof templates>(
    templateName: T
) {
    const singleTemplate = templates[templateName];

    // validate schema and conditions based on the template
    const validateSchema = ajv.compile(singleTemplate.schema);
    const validateConditions = ajv.compile(singleTemplate.conditions);


    function bindTemplateInternal(data: {}, conditions: {}) {
        const ajvSchemaResult = validateSchema(data);
        const ajvConditionResult = validateConditions(conditions);

        if (!ajvSchemaResult) {
            throw new ValidationError(validateSchema.errors as any);
        }

        if (!ajvConditionResult) {
            throw new ValidationError(validateConditions.errors as any);
        }

        return {
            html: singleTemplate.template(data as any, conditions as any),
            plaintext: singleTemplate.plaintext(data as any, conditions as any),
        };
    }

    return bindTemplateInternal as unknown as (data: TemplateType<T>, conditions: TemplateConditionsType<T>) => {
        html: string;
        plaintext: string;
    }
}