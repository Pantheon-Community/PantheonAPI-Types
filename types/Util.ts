import type { OAS } from "../global/OAS";

export type Brand<T, K extends string> = T & { __brand: K };

export interface SpecObject {
    schema: OAS.Schema;

    validate(input: unknown): void;
}

export interface SpecObjectFor<T> extends SpecObject {
    schema: OAS.Schema & {
        type: "object";
        properties: Record<keyof T, OAS.Schema>;
        required: (keyof T)[];
        additionalProperties: false;
    };

    subValidators: Record<keyof T, (input: unknown) => void>;
}
