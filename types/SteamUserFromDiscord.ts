import { validateObject } from "../spec/validators/object";
import { STEAM_USER, type SteamUser } from "./SteamUser";
import { USER, type User } from "./User";
import type { SpecObjectFor } from "./Util";

export interface SteamUserFromDiscord {
    discordId: User["id"];

    steamId: SteamUser["id"];

    steamUsername: SteamUser["username"];

    steamAvatar: SteamUser["avatar"];
}

export const STEAM_USER_FROM_DISCORD = {
    schema: {
        type: "object",
        properties: {
            discordId: USER.schema.properties.id,
            steamId: STEAM_USER.schema.properties.id,
            steamUsername: STEAM_USER.schema.properties.username,
            steamAvatar: STEAM_USER.schema.properties.avatar,
        },
        required: ["discordId", "steamId", "steamUsername", "steamAvatar"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        discordId: USER.subValidators.id,
        steamId: STEAM_USER.subValidators.id,
        steamUsername: STEAM_USER.subValidators.username,
        steamAvatar: STEAM_USER.subValidators.avatar,
    },
} as const satisfies SpecObjectFor<SteamUserFromDiscord>;
