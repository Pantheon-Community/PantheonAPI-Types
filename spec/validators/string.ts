import { pluralize } from "../../utils/pluralize";
import { getTypeName } from "../../utils/specHelpers";

function validateStringInternal(input: unknown): asserts input is string {
    const type = typeof input;

    if (type !== "string") {
        throw new Error(`Must be a string (got ${getTypeName(type)}).`);
    }
}

export function validateString(
    input: unknown,
    minLength: number,
    maxLength: number,
): asserts input is string {
    validateStringInternal(input);

    if (input.length < minLength) {
        throw new Error(
            `Cannot be less than ${pluralize(minLength, "character")} characters long.`,
        );
    }

    if (input.length > maxLength) {
        throw new Error(`Cannot be more than ${pluralize(maxLength, "character")} long.`);
    }
}

export function validateStringFormatted(
    input: unknown,
    minLength: number,
    maxLength: number,
    format: RegExp,
): asserts input is string {
    validateString(input, minLength, maxLength);

    if (!format.test(input)) {
        throw new Error(`Must match the format "${format.toString()}"`);
    }
}
