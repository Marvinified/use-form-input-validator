declare module "use-form-input-validator" {
    import { ChangeEvent, SyntheticEvent } from "react";
    interface InputField {
        [key: string]: {
            value: string
            checks: string
            validate: (value: string) => string
        }
    }
    interface InputValues {
        [key: string]: [value: string]
    }
    interface InputErrors {
        [key: string]: [error: string]
    }

    export default function useFormValidator(inputs: InputField): {
        values: InputValues
        errors: InputErrors
        updateField: (event: ChangeEvent<HTMLInputElement>) => void
        isFieldValid: (key) => boolean
        isAllFieldsValid: () => boolean
    };
}
