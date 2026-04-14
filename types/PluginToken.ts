import { INTEGER } from "../spec/schemas/integer";
import { STRING } from "../spec/schemas/string";
import { validateInteger } from "../spec/validators/integer";
import { validateObject } from "../spec/validators/object";
import { validateString, validateStringFormatted } from "../spec/validators/string";
import { DISCORD_ID, ISO_STRING, type DiscordId, type IsoString } from "./Common";
import type { Brand, SpecObject, SpecObjectFor } from "./Util";

/**
 * An authorisation token used by our SCP:SL plugins.
 *
 * @example "dd61ae073412c7738e687847c658e94a"
 */
export type PluginToken = Brand<string, "pluginToken">;

const pluginTokenRegExp = new RegExp(/^[a-z0-9]+$/);

export const PLUGIN_TOKEN = {
    schema: {
        type: "string",
        description: "An authorisation token used by our SCP:SL plugins.",
        example: "dd61ae073412c7738e687847c658e94a",
        minLength: 32,
        maxLength: 32,
    },
    validate: (input) => validateStringFormatted(input, 32, 32, pluginTokenRegExp),
} as const satisfies SpecObject;

export type PluginTokenId = Brand<number, "pluginTokenId">;

export const Plugin_TOKEN_ID = {
    schema: INTEGER,
    validate: validateInteger,
} as const satisfies SpecObject;

export interface PluginTokenObject {
    id: PluginTokenId;

    label: string;

    timesUsed: number;

    lastUsedAt: IsoString;

    createdBy: DiscordId | null;

    createdAt: IsoString;

    lastUpdatedBy: DiscordId | null;

    lastUpdatedAt: IsoString;
}

export const PLUGIN_TOKEN_OBJECT = {
    schema: {
        type: "object",
        properties: {
            id: Plugin_TOKEN_ID.schema,
            label: STRING(1, 64, "plugin token label"),
            timesUsed: {
                ...INTEGER,
                minimum: 0,
            },
            lastUsedAt: ISO_STRING.schema,
            createdBy: { ...DISCORD_ID.schema, nullable: true },
            createdAt: ISO_STRING.schema,
            lastUpdatedBy: { ...DISCORD_ID.schema, nullable: true },
            lastUpdatedAt: ISO_STRING.schema,
        },
        required: [
            "id",
            "label",
            "timesUsed",
            "lastUsedAt",
            "createdBy",
            "createdAt",
            "lastUpdatedBy",
            "lastUpdatedAt",
        ],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        id: Plugin_TOKEN_ID.validate,
        label: (input) => validateString(input, 1, 64),
        timesUsed: (input) => validateInteger(input, 0),
        lastUsedAt: ISO_STRING.validate,
        createdBy: (input) => input === null || DISCORD_ID.validate(input),
        createdAt: ISO_STRING.validate,
        lastUpdatedBy: (input) => input === null || DISCORD_ID.validate(input),
        lastUpdatedAt: ISO_STRING.validate,
    },
} as const satisfies SpecObjectFor<PluginTokenObject>;
