import type { OAS } from "../global/OAS";
import type { SpecObjectFor } from "../types/Util";

/**
 * Returns the noun with its indefinite article of the given {@link type}.
 *
 * @example
 * ```ts
 * getTypeName("object"); // "an object"
 * getTypeName("undefined"); // "undefined"
 * getTypeName("number"); // "a number"
 * ```
 */
export function getTypeName(
    type:
        | "string"
        | "number"
        | "bigint"
        | "boolean"
        | "symbol"
        | "undefined"
        | "object"
        | "function",
): string {
    // oxlint-disable-next-line typescript/switch-exhaustiveness-check
    switch (type) {
        case "object":
            return "an object";
        case "undefined":
            return "undefined";
        default:
            return `a ${type}`;
    }
}

export function omit<T, K extends keyof T>(
    spec: SpecObjectFor<T>,
    ...keys: K[]
): SpecObjectFor<Omit<T, K>> {
    const newProperties = { ...spec.schema.properties };
    const newSubValidators = { ...spec.subValidators };
    const newRequired = new Set(spec.schema.required);

    for (const key of keys) {
        delete newProperties[key];
        delete newSubValidators[key];
        newRequired.delete(key);
    }

    return {
        ...spec,
        schema: {
            ...spec.schema,
            properties: newProperties,
            required: Array.from(newRequired) as [],
        },
        validate(input) {
            spec.validate.call(this, input);
        },
        subValidators: newSubValidators,
    };
}

export function pick<T, K extends keyof T>(
    spec: SpecObjectFor<T>,
    ...keys: K[]
): SpecObjectFor<Pick<T, K>> {
    const newProperties = {} as Record<K, OAS.Schema>;
    const newSubValidators = {} as Record<K, (input: unknown) => void>;
    const newRequired = new Set<K>();

    for (const key of keys) {
        newProperties[key] = spec.schema.properties[key];
        newSubValidators[key] = spec.subValidators[key];
        newRequired.add(key);
    }

    return {
        ...spec,
        schema: {
            ...spec.schema,
            properties: newProperties,
            required: Array.from(newRequired) as [],
        },
        validate(input) {
            spec.validate.call(this, input);
        },
        subValidators: newSubValidators,
    };
}

export function partial<T>(spec: SpecObjectFor<T>): SpecObjectFor<Partial<T>> {
    const schema = { ...spec.schema };

    // @ts-expect-error
    delete schema.required;

    return {
        ...spec,
        schema,
        validate(input) {
            spec.validate.call(this, input);
        },
    };
}
