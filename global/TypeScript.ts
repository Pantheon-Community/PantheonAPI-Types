import type { IsoString } from "../types/Common";

declare global {
    interface Date {
        toISOString(): IsoString;
    }

    interface NumberConstructor {
        isSafeInteger(number: unknown): number is number;
    }
}
