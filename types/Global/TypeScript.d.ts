import type { IsoString } from "../Common";
import type { RequestMethod } from "../RequestMethod";

declare global {
    interface Date {
        toISOString(): IsoString;
    }

    interface RequestInit {
        method?: RequestMethod;
    }
}
