import type { IsoString } from "../types/Common";

declare global {
    interface Date {
        toISOString(): IsoString;
    }
}
