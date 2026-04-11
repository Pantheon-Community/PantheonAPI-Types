/**
 * Gets the value of a bitfield representing all of its members.
 *
 * @example
 * ```ts
 * enum MyBitfield {
 *     A = 1,
 *     B = 2,
 *     C = 4,
 * }
 * getAll(MyBitfield); // 7
 * ```
 */
export function getAll(x: Record<string | number, string | number>): number {
    const biggest = Math.max(...Object.values(x).filter((value) => typeof value === "number"), 0);

    return (biggest << 1) - 1;
}

/**
 * Splits a bitfield value into its individual members.
 *
 * @example
 * ```ts
 * enum MyBitfield {
 *     A = 1,
 *     B = 2,
 *     C = 4,
 * }
 * split(MyBitfield.A | MyBitfield.B); // [MyBitfield.A, MyBitfield.B]
 * ```
 */
export function split<T extends number>(permissions: T): T[] {
    let x: number = permissions;

    const values: number[] = [];

    while (x > 0) {
        const bit = x & (~x + 1);
        values.push(bit);

        x ^= bit;
    }

    return values as T[];
}

/**
 * Returns whether the given {@link source} bitfield value has the specified {@link target} values.
 *
 * @example
 * ```ts
 * enum MyBitfield {
 *     A = 1,
 *     B = 2,
 *     C = 4,
 * }
 * has(MyBitfield.A | MyBitfield.B, MyBitfield.A); // true
 * has(MyBitfield.A | MyBitfield.B, MyBitfield.C); // false
 * ```
 */
export function has<T extends number>(source: T, target: T): boolean {
    return (source & target) === target;
}
