import { STRING } from "../../spec/schemas/string";
import { validateObject } from "../../spec/validators/object";
import { validateString } from "../../spec/validators/string";
import type { SpecObjectFor } from "../Util";

export interface LoginRequest {
    code: string;

    redirectUri: string;
}

export const LOGIN_REQUEST = {
    schema: {
        type: "object",
        properties: {
            code: STRING(1, 32, "EFIBZf4pWSTRXNVLEIAGAJCV35aX8Y"),
            redirectUri: STRING(1, 64, "https://dev.pantheoncommunity.org/login"),
        },
        required: ["code", "redirectUri"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        code: (input) => validateString(input, 1, 32),
        redirectUri: (input) => validateString(input, 1, 64),
    },
} as const satisfies SpecObjectFor<LoginRequest>;
