import { getTypeName } from "../../utils/specHelpers";

function validateIntegerInternal(
    input: unknown,
    min: number,
    max: number,
): asserts input is number {
    if (Number.isNaN(input)) {
        throw new Error(`Must be an integer (got NaN).`);
    }

    if (!Number.isSafeInteger(input)) {
        throw new Error(`Must be an integer (got ${getTypeName(typeof input)}).`);
    }

    if (input < min) {
        throw new Error(`Cannot be less than ${min.toLocaleString()}.`);
    }

    if (input > max) {
        throw new Error(`Cannot be greater than ${max.toLocaleString()}.`);
    }
}
export function validateSmallInt(
    input: unknown,
    min: number = -32768,
    max: number = 32767,
): asserts input is number {
    validateIntegerInternal(input, min, max);
}

export function validateInteger(
    input: unknown,
    min: number = -2147483648,
    max: number = 2147483647,
): asserts input is number {
    validateIntegerInternal(input, min, max);
}
