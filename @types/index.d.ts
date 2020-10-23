

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
        updateField: (field: { key: string, value: string }) => void
        validateAllField: () => boolean;
    };
}
