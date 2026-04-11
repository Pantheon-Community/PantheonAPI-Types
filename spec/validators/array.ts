import { pluralize } from "../../utils/pluralize";
import { getTypeName } from "../../utils/specHelpers";

export function validateArray<T>(
    input: unknown,
    minLength: number,
    maxLength: number,
    validateItem: (input: unknown) => void,
): asserts input is T[] {
    if (!Array.isArray(input)) {
        throw new Error(`Must be an array (got ${getTypeName(typeof input)}).`);
    }

    if (input.length < minLength) {
        throw new Error(`Cannot contain less than ${pluralize(minLength, "item")}.`);
    }

    if (input.length > maxLength) {
        throw new Error(`Cannot contain more than ${pluralize(maxLength, "item")}.`);
    }

    for (let i = 0; i < input.length; i++) {
        try {
            validateItem(input[i]);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(
                    `Error with item at index ${i.toLocaleString()}: ${error.message}`,
                    { cause: error },
                );
            }

            throw error;
        }
    }
}
