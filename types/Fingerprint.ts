import { validateObject } from "../spec/validators/object";
import {
    IP,
    ORIGIN,
    USER_AGENT,
    USER_AGENT_HINT,
    type Ip,
    type Origin,
    type UserAgent,
    type UserAgentHint,
} from "./Common";
import type { SpecObjectFor } from "./Util";

export interface Fingerprint {
    ip: Ip | null;

    userAgent: UserAgent | null;

    userAgentHint: UserAgentHint | null;

    origin: Origin | null;
}

export const FINGERPRINT = {
    schema: {
        type: "object",
        properties: {
            ip: { ...IP.schema, nullable: true },
            userAgent: { ...USER_AGENT.schema, nullable: true },
            userAgentHint: { ...USER_AGENT_HINT.schema, nullable: true },
            origin: { ...ORIGIN.schema, nullable: true },
        },
        required: ["ip", "userAgent", "origin"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        ip: (input) => input === null || IP.validate(input),
        userAgent: (input) => input === null || USER_AGENT.validate(input),
        userAgentHint: (input) => input === null || USER_AGENT_HINT.validate(input),
        origin: (input) => input === null || ORIGIN.validate(input),
    },
} as const satisfies SpecObjectFor<Fingerprint>;
