import { validateObject } from "../../spec/validators/object";
import { PLUGIN_TOKEN, type PluginToken } from "../PluginToken";
import type { SpecObjectFor } from "../Util";

export interface CheckPluginTokenRequest {
    token: PluginToken;
}

export const CHECK_PLUGIN_TOKEN_REQUEST: SpecObjectFor<CheckPluginTokenRequest> = {
    schema: {
        type: "object",
        properties: {
            token: PLUGIN_TOKEN.schema,
        },
        required: ["token"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        token: PLUGIN_TOKEN.validate,
    },
};
