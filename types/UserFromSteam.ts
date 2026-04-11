import { validateObject } from "../spec/validators/object";
import { STEAM_USER, type SteamUser } from "./SteamUser";
import { USER, type User } from "./User";
import type { SpecObjectFor } from "./Util";

export interface UserFromSteam {
    steamId: SteamUser["id"];

    discordId: User["id"];

    discordUsername: User["username"];

    discordAvatar: User["avatar"];
}

export const USER_FROM_STEAM = {
    schema: {
        type: "object",
        properties: {
            steamId: STEAM_USER.schema.properties.id,
            discordId: USER.schema.properties.id,
            discordUsername: USER.schema.properties.username,
            discordAvatar: USER.schema.properties.avatar,
        },
        required: ["steamId", "discordId", "discordUsername", "discordAvatar"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        steamId: STEAM_USER.subValidators.id,
        discordId: USER.subValidators.id,
        discordUsername: USER.subValidators.username,
        discordAvatar: USER.subValidators.avatar,
    },
} as const satisfies SpecObjectFor<UserFromSteam>;
