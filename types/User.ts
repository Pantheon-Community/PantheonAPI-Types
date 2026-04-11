import { INTEGER } from "../spec/schemas/integer";
import { STRING } from "../spec/schemas/string";
import { validateInteger } from "../spec/validators/integer";
import { validateObject } from "../spec/validators/object";
import { validateString } from "../spec/validators/string";
import { DISCORD_ID, ISO_STRING, type DiscordId, type IsoString } from "./Common";
import { ECONOMY_STATS, type EconomyStats } from "./EconomyStats";
import { FINGERPRINT, type Fingerprint } from "./Fingerprint";
import { STEAM_ID_64, type SteamId64 } from "./SteamUser";
import type { SpecObjectFor } from "./Util";

export interface User {
    id: DiscordId;

    username: string;

    avatar: string | null;

    steamId: SteamId64 | null;

    firstSeenAt: IsoString;

    lastSeenAt: IsoString;

    lifetimeActionCount: number;

    fingerprint: Fingerprint;

    economyStats: EconomyStats;
}

export const USER = {
    schema: {
        type: "object",
        properties: {
            id: DISCORD_ID.schema,
            username: STRING(2, 32, "discord username"),
            avatar: { ...STRING(0, 32, "avatar_hash") },
            steamId: { ...STEAM_ID_64.schema, nullable: true },
            firstSeenAt: ISO_STRING.schema,
            lastSeenAt: ISO_STRING.schema,
            lifetimeActionCount: { ...INTEGER, minimum: 0 },
            fingerprint: FINGERPRINT.schema,
            economyStats: ECONOMY_STATS.schema,
        },
        required: [
            "id",
            "username",
            "avatar",
            "steamId",
            "firstSeenAt",
            "lastSeenAt",
            "lifetimeActionCount",
            "fingerprint",
            "economyStats",
        ],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        id: DISCORD_ID.validate,
        username: (input) => validateString(input, 2, 32),
        avatar: (input) => validateString(input, 0, 32),
        steamId: (input) => input === null || STEAM_ID_64.validate(input),
        firstSeenAt: ISO_STRING.validate,
        lastSeenAt: ISO_STRING.validate,
        lifetimeActionCount: (input) => validateInteger(input, 0),
        fingerprint: FINGERPRINT.validate.bind(FINGERPRINT),
        economyStats: ECONOMY_STATS.validate.bind(ECONOMY_STATS),
    },
} as const satisfies SpecObjectFor<User>;
