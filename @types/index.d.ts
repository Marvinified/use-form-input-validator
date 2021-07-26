import { ChangeEvent } from "react";

declare module "use-form-input-validator" {
    export type InputField = {
        value: string
        checks: string
        validate: (value: string, values: Record<string, string>) => string
    }

    export type FormValidator = {
        values: Record<string, InputField>;
        errors: Record<string, string>
        updateField: (event: ChangeEvent<HTMLInputElement>) => void
        isFieldValid: (key) => boolean
        isAllFieldsValid: () => boolean
    }
    export default function useFormValidator(inputs: InputField): FormValidator;
}
