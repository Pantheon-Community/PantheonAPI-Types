import { INTEGER } from "../spec/schemas/integer";
import { validateInteger } from "../spec/validators/integer";
import { validateObject } from "../spec/validators/object";
import { ISO_STRING, type IsoString } from "./Common";
import type { SpecObjectFor } from "./Util";

export interface EconomyStats {
    balance: number;

    lifetimeBalance: number;

    lifetimePurchaseCount: number;

    lastLoginBonusGivenAt: IsoString | null;

    loginStreak: number;
}

export const ECONOMY_STATS = {
    schema: {
        type: "object",
        properties: {
            balance: INTEGER,
            lifetimeBalance: INTEGER,
            lifetimePurchaseCount: { ...INTEGER, minimum: 0 },
            lastLoginBonusGivenAt: { ...ISO_STRING.schema, nullable: true },
            loginStreak: { ...INTEGER, minimum: 0 },
        },
        required: [
            "balance",
            "lifetimeBalance",
            "lifetimePurchaseCount",
            "lastLoginBonusGivenAt",
            "loginStreak",
        ],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        balance: validateInteger,
        lifetimeBalance: validateInteger,
        lifetimePurchaseCount: (input) => validateInteger(input, 0),
        lastLoginBonusGivenAt: (input) => input === null || ISO_STRING.validate(input),
        loginStreak: (input) => validateInteger(input, 0),
    },
} as const satisfies SpecObjectFor<EconomyStats>;
