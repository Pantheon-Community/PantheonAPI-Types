import type { OAS } from "../../global/OAS";

export const SMALLINT = {
    type: "integer",
    minimum: -32768,
    maximum: 32767,
} as const satisfies OAS.Schema;

export const INTEGER = {
    type: "integer",
    minimum: -2147483648,
    maximum: 2147483647,
} as const satisfies OAS.Schema;
