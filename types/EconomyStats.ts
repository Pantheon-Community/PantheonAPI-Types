import { INTEGER } from "../spec/schemas/integer";
import { validateInteger } from "../spec/validators/integer";
import { validateObject } from "../spec/validators/object";
import type { SpecObjectFor } from "./Util";

export interface EconomyStats {
    balance: number;

    lifetimeBalance: number;

    lifetimePurchaseCount: number;
}

export const ECONOMY_STATS = {
    schema: {
        type: "object",
        properties: {
            balance: INTEGER,
            lifetimeBalance: INTEGER,
            lifetimePurchaseCount: { ...INTEGER, minimum: 0 },
        },
        required: ["balance", "lifetimeBalance", "lifetimePurchaseCount"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        balance: validateInteger,
        lifetimeBalance: validateInteger,
        lifetimePurchaseCount: (input) => validateInteger(input, 0),
    },
} as const satisfies SpecObjectFor<EconomyStats>;
