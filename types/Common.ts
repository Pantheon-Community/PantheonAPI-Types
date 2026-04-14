import { validateString, validateStringFormatted } from "../spec/validators/string";
import type { Brand, SpecObject } from "./Util";

/**
 * A string in ISO format, used to store dates.
 *
 * @see {@link https://en.wikipedia.org/wiki/ISO_8601}
 *
 * @example "2022-11-08T02:20:08.190Z"
 */
export type IsoString = Brand<string, "isoString">;

export const ISO_STRING = {
    schema: {
        type: "string",
        description:
            "A string in ISO format, used to store dates.\n\nhttps://en.wikipedia.org/wiki/ISO_8601",
        example: "2022-11-08T02:20:08.190Z",
        minLength: 24,
        maxLength: 27,
    },
    validate: (input) => validateString(input, 24, 27),
} as const satisfies SpecObject;

/**
 * A Discord ID snowflake.
 *
 * @see {@link https://discord.com/developers/docs/reference#snowflakes}
 *
 * @example "240312568273436674"
 */
export type DiscordId = Brand<string, "discordIdString">;

const discordIdRegExp = new RegExp(/^(seed-)?[0-9]+$/);

export const DISCORD_ID = {
    schema: {
        type: "string",
        description:
            "A Discord ID snowflake.\n\nhttps://discord.com/developers/docs/reference#snowflakes",
        example: "240312568273436674",
        minLength: 17,
        maxLength: 20,
    },
    validate: (input) => validateStringFormatted(input, 17, 20, discordIdRegExp),
} as const satisfies SpecObject;

/**
 * An authorisation token used by our users.
 *
 * Also serves as a Discord OAuth2 access token.
 *
 * @see {@link https://docs.discord.com/developers/topics/oauth2}
 *
 * @example "6qrZcUqja7812RVdnEKjpzOL4CvHBFG.6qrZcUqja7812RVdnEKjpzOL4CvHBFG"
 */
export type UserToken = Brand<string, "userToken">;

const userTokenRegExp = new RegExp(/^[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/);

export const USER_TOKEN = {
    schema: {
        type: "string",
        description:
            "An authorisation token used by our users.\n\nAlso serves as a Discord OAuth2 access token.\n\nhttps://docs.discord.com/developers/topics/oauth2",
        example: "6qrZcUqja7812RVdnEKjpzOL4CvHBFG.6qrZcUqja7812RVdnEKjpzOL4CvHBFG",
        minLength: 1,
        maxLength: 64,
    },
    validate: (input) => validateStringFormatted(input, 1, 64, userTokenRegExp),
} as const satisfies SpecObject;

/**
 * An IP address, not uniformly structured!
 *
 * @example "152.143.112.125"
 * @example "::ffff:127.0.0.1"
 * @example "6ae1:c1b3:ac70:af3e:643b:bc3e:fda4:3e9b"
 */
export type Ip = Brand<string, "ip">;

export const IP = {
    schema: {
        type: "string",
        description:
            "An IP address, not uniformly structured!\n\n- `152.143.112.125`\n- `::ffff:127.0.0.1`\n- `6ae1:c1b3:ac70:af3e:643b:bc3e:fda4:3e9b`",
        example: "152.143.112.125",
        maxLength: 128,
    },
    validate: (input) => validateString(input, 0, 128),
} as const satisfies SpecObject;

/**
 * Browser and other software information.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent MDN Reference}
 *
 * @example "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0"
 */
export type UserAgent = Brand<string, "userAgent">;

export const USER_AGENT = {
    schema: {
        type: "string",
        description:
            "Browser and other software information.\n\n[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent)",
        example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0",
        maxLength: 128,
    },
    validate: (input) => validateString(input, 0, 128),
} as const satisfies SpecObject;

/**
 * User agent client hint.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-CH-UA MDN Reference}
 *
 * @example "Not A;Brand';v='99', 'Chromium';v='96', 'Google Chrome';v='96'"
 */
export type UserAgentHint = Brand<string, "userAgentHint">;

export const USER_AGENT_HINT = {
    schema: {
        type: "string",
        description:
            "User agent client hint.\n\n[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-CH-UA)",
        example: "Not A;Brand';v='99', 'Chromium';v='96', 'Google Chrome';v='96'",
        maxLength: 128,
    },
    validate: (input) => validateString(input, 0, 128),
} as const satisfies SpecObject;

/**
 * An origin URL of a client.
 *
 * @example "http://localhost:5000"
 * @example "https://dev.pantheoncommunity.org"
 */
export type Origin = Brand<string, "userOrigin">;

export const ORIGIN = {
    schema: {
        type: "string",
        description:
            "An origin URL of a client.\n\n- `http://localhost:5000`\n- `https://dev.pantheoncommunity.org`",
        example: "http://localhost:5000",
        maxLength: 64,
    },
    validate: (input) => validateString(input, 0, 64),
} as const satisfies SpecObject;
