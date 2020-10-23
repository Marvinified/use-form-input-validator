import { SyntheticEvent } from "react";
declare module "use-form-input-validator" {
    interface InputField {
        [key: string]: {
            value: string
            checks: string
            error: string
            validate: (value: string) => string
        }
    }
    type hasError = boolean;

    export default function useFormValidator(inputs: InputField): {
        fields: InputField,
        updateField: (event: SyntheticEvent) => void
        updateField: (field: { key: string, value: string }) => void
        validateAllField: () => boolean;
    };
}
