import type { OAS } from "../../global/OAS";

export function STRING(minLength: number, maxLength: number, example: string): OAS.Schema {
    return {
        type: "string",
        minLength,
        maxLength,
        example,
    };
}
