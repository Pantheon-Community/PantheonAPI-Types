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
            balance: { ...INTEGER, minimum: 0 },
            lifetimeBalance: { ...INTEGER, minimum: 0 },
            lifetimePurchaseCount: { ...INTEGER, minimum: 0 },
        },
        required: ["balance", "lifetimeBalance", "lifetimePurchaseCount"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        balance: (input) => validateInteger(input, 0),
        lifetimeBalance: (input) => validateInteger(input, 0),
        lifetimePurchaseCount: (input) => validateInteger(input, 0),
    },
} as const satisfies SpecObjectFor<EconomyStats>;
