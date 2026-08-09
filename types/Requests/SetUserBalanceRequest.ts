import { INTEGER } from "../../spec/schemas/integer";
import { validateInteger } from "../../spec/validators/integer";
import { validateObject } from "../../spec/validators/object";
import type { SpecObjectFor } from "../Util";

export interface SetUserBalanceRequest {
    amount: number;
}

export const SET_USER_BALANCE_REQUEST: SpecObjectFor<SetUserBalanceRequest> = {
    schema: {
        type: "object",
        properties: {
            amount: INTEGER,
        },
        required: ["amount"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        amount: validateInteger,
    },
};
