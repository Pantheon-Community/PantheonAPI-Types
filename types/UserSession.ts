import { INTEGER } from "../spec/schemas/integer";
import { validateInteger } from "../spec/validators/integer";
import { validateObject } from "../spec/validators/object";
import { pick } from "../utils/specHelpers";
import {
    DISCORD_ID,
    ISO_STRING,
    USER_TOKEN,
    type DiscordId,
    type IsoString,
    type UserToken,
} from "./Common";
import { FINGERPRINT, type Fingerprint } from "./Fingerprint";
import type { Brand, SpecObject, SpecObjectFor } from "./Util";

/**
 * Way of uniquely referring to a user session.
 *
 * Although the `accessToken` field of a user session is also unique, using it to externally
 * identify user sessions has obvious security drawbacks.
 */
export type UserSessionId = Brand<number, "userSessionId">;

export const USER_SESSION_ID = {
    schema: {
        ...INTEGER,
        description:
            "Way of uniquely referring to a user session.\n\nAlthough the `accessToken` field of a user session is also unique, using it to externally identify user sessions has obvious security drawbacks.",
    },
    validate: validateInteger,
} as const satisfies SpecObject;

export interface UserSession {
    id: UserSessionId;

    userId: DiscordId;

    accessToken: UserToken;

    refreshToken: UserToken;

    startedAt: IsoString;

    expiresAt: IsoString;

    timesRefreshed: number;

    actionCount: number;

    lastActionAt: IsoString;

    fingerprint: Fingerprint;
}

export const USER_SESSION = {
    schema: {
        type: "object",
        properties: {
            id: USER_SESSION_ID.schema,
            userId: DISCORD_ID.schema,
            accessToken: USER_TOKEN.schema,
            refreshToken: USER_TOKEN.schema,
            startedAt: ISO_STRING.schema,
            expiresAt: ISO_STRING.schema,
            timesRefreshed: { ...INTEGER, minimum: 0 },
            actionCount: { ...INTEGER, minimum: 0 },
            lastActionAt: ISO_STRING.schema,
            fingerprint: FINGERPRINT.schema,
        },
        required: [
            "id",
            "userId",
            "accessToken",
            "refreshToken",
            "startedAt",
            "expiresAt",
            "timesRefreshed",
            "actionCount",
            "lastActionAt",
            "fingerprint",
        ],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        id: USER_SESSION_ID.validate,
        userId: USER_SESSION_ID.validate,
        accessToken: USER_TOKEN.validate,
        refreshToken: USER_TOKEN.validate,
        startedAt: ISO_STRING.validate,
        expiresAt: ISO_STRING.validate,
        timesRefreshed: (input) => validateInteger(input, 0),
        actionCount: (input) => validateInteger(input, 0),
        lastActionAt: ISO_STRING.validate,
        fingerprint: FINGERPRINT.validate.bind(FINGERPRINT),
    },
} as const satisfies SpecObjectFor<UserSession>;

export type UserSessionBasic = Pick<
    UserSession,
    "id" | "startedAt" | "lastActionAt" | "fingerprint"
>;

export const USER_SESSION_BASIC: SpecObjectFor<UserSessionBasic> = pick(
    USER_SESSION,
    "id",
    "startedAt",
    "lastActionAt",
    "fingerprint",
);
