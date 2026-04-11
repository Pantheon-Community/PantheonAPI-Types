import { validateArray } from "../../spec/validators/array";
import { validateObject } from "../../spec/validators/object";
import { pick } from "../../utils/specHelpers";
import { STEAM_USER, type SteamUser } from "../SteamUser";
import { USER, type User } from "../User";
import type { SpecObjectFor } from "../Util";

export type GetMeUser = Pick<User, "id" | "username" | "avatar" | "steamId" | "economyStats">;

export const GET_ME_USER: SpecObjectFor<GetMeUser> = pick(
    USER,
    "id",
    "username",
    "avatar",
    "steamId",
    "economyStats",
);

export interface GetMeResponse {
    user: GetMeUser;

    steamUsers: SteamUser[];
}

export const GET_ME_RESPONSE = {
    schema: {
        type: "object",
        properties: {
            user: GET_ME_USER.schema,
            steamUsers: {
                type: "array",
                items: STEAM_USER.schema,
            },
        },
        required: ["user", "steamUsers"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        user: GET_ME_USER.validate.bind(GET_ME_USER),
        steamUsers: (input) =>
            validateArray(input, 0, Number.MAX_SAFE_INTEGER, STEAM_USER.validate.bind(STEAM_USER)),
    },
} as const satisfies SpecObjectFor<GetMeResponse>;
