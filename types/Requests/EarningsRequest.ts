import { INTEGER } from "../../spec/schemas/integer";
import { validateInteger } from "../../spec/validators/integer";
import { validateObject } from "../../spec/validators/object";
import { STEAM_ID_64, STEAM_USER, type SteamId64 } from "../SteamUser";
import type { SpecObjectFor } from "../Util";

export interface EarningsRequest {
    steamId: SteamId64;

    username: string;

    balanceInc: number;
}

export const EARNINGS_REQUEST = {
    schema: {
        type: "object",
        properties: {
            steamId: STEAM_ID_64.schema,
            username: STEAM_USER.schema.properties.username,
            balanceInc: {
                ...INTEGER,
                minimum: 1,
            },
        },
        required: ["steamId", "username", "balanceInc"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        steamId: STEAM_ID_64.validate,
        username: STEAM_USER.subValidators.username,
        balanceInc: (input) => validateInteger(input, 1),
    },
} as const satisfies SpecObjectFor<EarningsRequest>;
