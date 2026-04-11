import type { SpecObjectFor } from "../../types/Util";
import { formatList } from "../../utils/formatList";
import { getTypeName } from "../../utils/specHelpers";

function ensureIsTypeObject(input: unknown): asserts input is object {
    if (input === null) {
        throw new Error("Must be an object (got null).");
    }

    const type = typeof input;

    if (type !== "object") {
        throw new Error(`Must be an object (got ${getTypeName(type)}).`);
    }
}

function ensureHasAllKeys<T>(
    input: object,
    keys: (keyof T)[],
): asserts input is Record<keyof T, unknown> {
    const missingKeys: (keyof T)[] = [];

    for (const key of keys) {
        if (!Object.hasOwn(input, key)) {
            missingKeys.push(key);
        }
    }

    switch (missingKeys.length) {
        case 0:
            break;
        case 1:
            throw new Error(`Missing required property: "${missingKeys[0]!.toString()}"`);
        default:
            throw new Error(
                `Missing ${missingKeys.length.toLocaleString()} required properties: ${formatList(
                    missingKeys.map((x) => `"${x.toString()}"`),
                    "and",
                )}`,
            );
    }
}

function ensureHasNoExtraKeys<T>(input: object, keys: Record<keyof T, unknown>): void {
    const allowedKeys = new Set(Object.keys(keys));

    const extraKeys: string[] = [];

    for (const key of Object.keys(input)) {
        if (!allowedKeys.has(key)) {
            extraKeys.push(key);
        }
    }

    switch (extraKeys.length) {
        case 0:
            break;
        case 1:
            throw new Error(`Has unrecognised property: "${extraKeys[0]}"`);
        default:
            throw new Error(
                `Has ${extraKeys.length.toLocaleString()} unrecognised properties: ${formatList(
                    extraKeys.map((x) => `"${x}"`),
                    "and",
                )}`,
            );
    }
}

export function validateObject<T>(input: unknown, spec: SpecObjectFor<T>): asserts input is T {
    ensureIsTypeObject(input);
    ensureHasAllKeys<T>(input, spec.schema.required);
    ensureHasNoExtraKeys(input, spec.schema.properties);

    for (const [key, value] of Object.entries(input) as [keyof T, unknown][]) {
        try {
            spec.subValidators[key](value);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error with property "${key.toString()}": ${error.message}`, {
                    cause: error,
                });
            }

            throw error;
        }
    }
}
