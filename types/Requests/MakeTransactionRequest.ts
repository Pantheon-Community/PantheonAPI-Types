import { INTEGER } from "../../spec/schemas/integer";
import { validateInteger } from "../../spec/validators/integer";
import { validateObject } from "../../spec/validators/object";
import { ECONOMY_REWARD_ID, type EconomyRewardId } from "../EconomyReward";
import type { SpecObjectFor } from "../Util";

export interface MakeTransactionRequest {
    rewardId: EconomyRewardId;

    expectedPrice: number;
}

export const MAKE_TRANSACTION_REQUEST = {
    schema: {
        type: "object",
        properties: {
            rewardId: ECONOMY_REWARD_ID.schema,
            expectedPrice: {
                ...INTEGER,
                minimum: 1,
            },
        },
        required: ["rewardId", "expectedPrice"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        rewardId: ECONOMY_REWARD_ID.validate,
        expectedPrice: (input) => validateInteger(input, 1),
    },
} as const satisfies SpecObjectFor<MakeTransactionRequest>;
