import { validateArray } from "../../spec/validators/array";
import { validateObject } from "../../spec/validators/object";
import { STEAM_USER, type SteamUser } from "../SteamUser";
import { USER, type User } from "../User";
import type { SpecObjectFor } from "../Util";

export interface GetDirectUser extends Pick<User, "id" | "username" | "avatar"> {
    steamId: SteamUser["id"];
}

export const GET_DIRECT_USER = {
    schema: {
        type: "object",
        properties: {
            id: USER.schema.properties.id,
            username: USER.schema.properties.username,
            avatar: USER.schema.properties.avatar,
            steamId: STEAM_USER.schema.properties.id,
        },
        required: ["id", "username", "avatar", "steamId"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        id: USER.subValidators.id,
        username: USER.subValidators.username,
        avatar: USER.subValidators.avatar,
        steamId: STEAM_USER.subValidators.id,
    },
} as const satisfies SpecObjectFor<GetDirectUser>;

export interface GetSteamDirectResponse {
    steamUsers: SteamUser[];

    users: GetDirectUser[];
}

export const GET_STEAM_DIRECT_RESPONSE = {
    schema: {
        type: "object",
        properties: {
            steamUsers: { type: "array", items: STEAM_USER.schema },
            users: { type: "array", items: GET_DIRECT_USER.schema },
        },
        required: ["steamUsers", "users"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        steamUsers: (input) =>
            validateArray(input, 0, Number.MAX_SAFE_INTEGER, STEAM_USER.validate.bind(STEAM_USER)),
        users: (input) =>
            validateArray(
                input,
                0,
                Number.MAX_SAFE_INTEGER,
                GET_DIRECT_USER.validate.bind(GET_DIRECT_USER),
            ),
    },
} as const satisfies SpecObjectFor<GetSteamDirectResponse>;
