/**
 * Formats a list of 2 or more {@link values} in a human format.
 *
 * @example
 * ```ts
 * formatList(["a, b"], "and"); // "a and b"
 * formatList(["a", "b", "c"], "or"); // "a, b, or c"
 * formatList(["a", "b", "c", "d"], "and"); // "a, b, c, and d"
 * ```
 */
export function formatList(values: string[], conjunction: string): string {
    if (values.length === 2) {
        return `${values[0]} ${conjunction} ${values[1]}`;
    }

    const lastValue = values.slice(-1)[0];
    const otherValues = values.slice(0, -1);

    return `${otherValues.join(", ")}, ${conjunction} ${lastValue}`;
}
