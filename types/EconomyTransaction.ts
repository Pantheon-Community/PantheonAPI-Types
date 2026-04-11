import { INTEGER } from "../spec/schemas/integer";
import { validateInteger } from "../spec/validators/integer";
import { validateObject } from "../spec/validators/object";
import { ISO_STRING, type IsoString } from "./Common";
import { ECONOMY_REWARD_ID, type EconomyRewardId } from "./EconomyReward";
import { STEAM_ID_64, type SteamId64 } from "./SteamUser";
import type { Brand, SpecObject, SpecObjectFor } from "./Util";

export type EconomyTransactionId = Brand<number, "transactionId">;

export const ECONOMY_TRANSACTION_ID = {
    schema: INTEGER,
    validate: validateInteger,
} as const satisfies SpecObject;

export interface EconomyTransaction {
    id: EconomyTransactionId;

    rewardId: EconomyRewardId;

    cost: number;

    madeAt: IsoString;

    purchaserId: SteamId64;
}

export const ECONOMY_TRANSACTION = {
    schema: {
        type: "object",
        properties: {
            id: ECONOMY_TRANSACTION_ID.schema,
            rewardId: ECONOMY_REWARD_ID.schema,
            cost: { ...INTEGER, minimum: 1 },
            madeAt: ISO_STRING.schema,
            purchaserId: STEAM_ID_64.schema,
        },
        required: ["id", "rewardId", "cost", "madeAt", "purchaserId"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        id: ECONOMY_TRANSACTION_ID.validate,
        rewardId: ECONOMY_REWARD_ID.validate,
        cost: (input) => validateInteger(input, 1),
        madeAt: ISO_STRING.validate,
        purchaserId: STEAM_ID_64.validate,
    },
} as const satisfies SpecObjectFor<EconomyTransaction>;

export interface CompletedEconomyTransaction extends Omit<EconomyTransaction, "rewardId"> {
    /** This is `null` if the reward was deleted. */
    rewardId: EconomyTransaction["rewardId"] | null;

    completedAt: IsoString;
}

export const COMPLETED_ECONOMY_TRANSACTION = {
    schema: {
        type: "object",
        properties: {
            ...ECONOMY_TRANSACTION.schema.properties,
            rewardId: {
                ...ECONOMY_TRANSACTION.schema.properties.rewardId,
                description: "This is `null` if the reward was deleted.",
                nullable: true,
            },
            completedAt: ISO_STRING.schema,
        },
        required: [...ECONOMY_TRANSACTION.schema.required, "completedAt"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        ...ECONOMY_TRANSACTION.subValidators,
        rewardId: (input) => input === null || ECONOMY_REWARD_ID.validate(input),
        completedAt: ISO_STRING.validate,
    },
} as const satisfies SpecObjectFor<CompletedEconomyTransaction>;
