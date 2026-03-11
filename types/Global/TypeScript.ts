import type { IsoString } from "../Common";

declare global {
    interface Date {
        toISOString(): IsoString;
    }
}
