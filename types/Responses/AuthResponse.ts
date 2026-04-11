import { validateArray } from "../../spec/validators/array";
import { validateObject } from "../../spec/validators/object";
import { ISO_STRING, USER_TOKEN, type IsoString, type UserToken } from "../Common";
import { ROLE_ID, type RoleId } from "../Role";
import { USER_SESSION_ID, type UserSessionId } from "../UserSession";
import type { SpecObjectFor } from "../Util";
import { GET_ME_RESPONSE, type GetMeResponse } from "./GetMeResponse";

export interface AuthResponse extends GetMeResponse {
    expiresAt: IsoString;

    token: UserToken;

    sessionId: UserSessionId;

    roleIds: RoleId[];
}

export const AUTH_RESPONSE = {
    schema: {
        type: "object",
        properties: {
            ...GET_ME_RESPONSE.schema.properties,
            expiresAt: ISO_STRING.schema,
            token: USER_TOKEN.schema,
            sessionId: USER_SESSION_ID.schema,
            roleIds: {
                type: "array",
                items: ROLE_ID.schema,
            },
        },
        required: [
            ...GET_ME_RESPONSE.schema.required,
            "expiresAt",
            "token",
            "sessionId",
            "roleIds",
        ],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        ...GET_ME_RESPONSE.subValidators,
        expiresAt: ISO_STRING.validate,
        token: USER_TOKEN.validate,
        sessionId: USER_SESSION_ID.validate,
        roleIds: (input) => validateArray(input, 0, Number.MAX_SAFE_INTEGER, ROLE_ID.validate),
    },
} as const satisfies SpecObjectFor<AuthResponse>;
