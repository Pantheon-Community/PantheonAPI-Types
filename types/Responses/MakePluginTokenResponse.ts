import { validateObject } from "../../spec/validators/object";
import {
    PLUGIN_TOKEN,
    PLUGIN_TOKEN_OBJECT,
    type PluginToken,
    type PluginTokenObject,
} from "../PluginToken";
import type { SpecObjectFor } from "../Util";

export interface PostPluginTokenResponse extends Pick<PluginTokenObject, "id"> {
    token: PluginToken;
}

export const MAKE_PLUGIN_TOKEN_RESPONSE = {
    schema: {
        type: "object",
        properties: {
            id: PLUGIN_TOKEN_OBJECT.schema.properties.id,
            token: PLUGIN_TOKEN.schema,
        },
        required: ["id", "token"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        id: PLUGIN_TOKEN_OBJECT.subValidators.id,
        token: PLUGIN_TOKEN.validate,
    },
} as const satisfies SpecObjectFor<PostPluginTokenResponse>;
