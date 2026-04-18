import { INTEGER } from "../spec/schemas/integer";
import { STRING } from "../spec/schemas/string";
import { validateInteger } from "../spec/validators/integer";
import { validateObject } from "../spec/validators/object";
import { validateString } from "../spec/validators/string";
import { ISO_STRING, type IsoString } from "./Common";
import { ECONOMY_STATS, type EconomyStats } from "./EconomyStats";
import type { Brand, SpecObject, SpecObjectFor } from "./Util";

/**
 * A SteamID64 account identifier.
 *
 * @see {@link https://steamid.io/}
 *
 * @example "76561198200316171"
 */
export type SteamId64 = Brand<string, "steamId64">;

// const steamId64RegExp = new RegExp(/^(seed-)?[0-9]+$/);

export const STEAM_ID_64 = {
    schema: {
        type: "string",
        description: "A SteamID64 account identifier.\n\nhttps://steamid.io/",
        example: "76561198200316171",
        minLength: 17,
        maxLength: 18,
    },
    // validate: (input) => validateStringFormatted(input, 17, 18, steamId64RegExp),
    validate: (input) => validateString(input, 0, 30),
} as const satisfies SpecObject;

export interface SteamUserAnalytics {
    firstSeenAt: IsoString;

    lastSeenAt: IsoString;

    timesSeen: number;
}

export const STEAM_USER_ANALYTICS = {
    schema: {
        type: "object",
        properties: {
            firstSeenAt: ISO_STRING.schema,
            lastSeenAt: ISO_STRING.schema,
            timesSeen: { ...INTEGER, minimum: 1 },
        },
        required: ["firstSeenAt", "lastSeenAt", "timesSeen"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        firstSeenAt: ISO_STRING.validate,
        lastSeenAt: ISO_STRING.validate,
        timesSeen: (input) => validateInteger(input, 1),
    },
} as const satisfies SpecObjectFor<SteamUserAnalytics>;

/** Steam user information, sourced from either in-game player info or Discord user connections. */
export interface SteamUser {
    id: SteamId64;

    /**
     * Latest username associated with this Steam ID.
     *
     * This may come from in-game player info or a Discord user connection.
     */
    username: string;

    /** @example "https://avatars.fastly.steamstatic.com/d789a47289ccb8c36eea2055a9b700e7718c6fac_full.jpg" */
    avatar: string | null;

    /** @example "New Zealand" */
    location: string | null;

    memberSince: IsoString | null;

    /** @example "director" */
    groupName: string | null;

    /** Information about a Steam user's in-game activity. */
    analytics: SteamUserAnalytics | null;

    economyStats: EconomyStats;
}

export const STEAM_USER = {
    schema: {
        type: "object",
        description:
            "Steam user information, sourced from either in-game player info or Discord user connections.",
        properties: {
            id: STEAM_ID_64.schema,
            username: {
                ...STRING(0, 32, "steam username"),
                description:
                    "Latest username associated with this Steam ID.\n\nThis may come from in-game player info or a Discord user connection.",
            },
            avatar: {
                ...STRING(
                    0,
                    128,
                    "https://avatars.fastly.steamstatic.com/d789a47289ccb8c36eea2055a9b700e7718c6fac_full.jpg",
                ),
                nullable: true,
            },
            location: { ...STRING(0, 64, "New Zealand"), nullable: true },
            memberSince: {
                ...ISO_STRING.schema,
                nullable: true,
            },
            groupName: { ...STRING(0, 64, "director"), nullable: true },
            analytics: {
                ...STEAM_USER_ANALYTICS.schema,
                description: "Information about a Steam user's in-game activity.",
                nullable: true,
            },
            economyStats: ECONOMY_STATS.schema,
        },
        required: [
            "id",
            "username",
            "avatar",
            "location",
            "memberSince",
            "groupName",
            "analytics",
            "economyStats",
        ],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        id: STEAM_ID_64.validate,
        username: (input) => validateString(input, 0, 32),
        avatar: (input) => input === null || validateString(input, 0, 128),
        location: (input) => input === null || validateString(input, 0, 64),
        memberSince: (input) => input === null || ISO_STRING.validate(input),
        groupName: (input) => input === null || validateString(input, 0, 64),
        analytics: (input) => input === null || STEAM_USER_ANALYTICS.validate(input),
        economyStats: ECONOMY_STATS.validate.bind(ECONOMY_STATS),
    },
} as const satisfies SpecObjectFor<SteamUser>;
