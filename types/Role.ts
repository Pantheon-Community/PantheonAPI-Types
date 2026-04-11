import { INTEGER, SMALLINT } from "../spec/schemas/integer";
import { STRING } from "../spec/schemas/string";
import { validateInteger, validateSmallInt } from "../spec/validators/integer";
import { validateObject } from "../spec/validators/object";
import { validateString } from "../spec/validators/string";
import { omit } from "../utils/specHelpers";
import { DISCORD_ID, ISO_STRING, type DiscordId, type IsoString } from "./Common";
import { PERMISSIONS_OBJECT, type PermissionsObject } from "./Permissions/PermissionsObject";
import type { Brand, SpecObject, SpecObjectFor } from "./Util";

export type RoleId = Brand<number, "roleId">;

export const ROLE_ID = {
    schema: INTEGER,
    validate: validateInteger,
} as const satisfies SpecObject;

export type RoleLevel = Brand<number, "roleLevel">;

export const ROLE_LEVEL = {
    schema: SMALLINT,
    validate: validateSmallInt,
} as const satisfies SpecObject;

export interface Role {
    id: RoleId;

    name: string;

    icon: string;

    category: string;

    level: RoleLevel;

    permissions: PermissionsObject;

    /** May be `null` if the user that created this role was deleted. */
    createdBy: DiscordId | null;

    createdAt: IsoString;

    /** May be `null` if the user that last updated this role was deleted. */
    lastUpdatedBy: DiscordId | null;

    lastUpdatedAt: IsoString;
}

export const ROLE = {
    schema: {
        type: "object",
        properties: {
            id: ROLE_ID.schema,
            name: STRING(0, 64, "role name"),
            icon: STRING(0, 64, "role icon"),
            category: STRING(0, 64, "role category"),
            level: ROLE_LEVEL.schema,
            permissions: PERMISSIONS_OBJECT.schema,
            createdBy: {
                ...DISCORD_ID.schema,
                nullable: true,
                description: `${DISCORD_ID.schema.description}\n\nMay be \`null\` if the user that created this role was deleted.`,
            },
            createdAt: ISO_STRING.schema,
            lastUpdatedBy: {
                ...DISCORD_ID.schema,
                nullable: true,
                description: `${DISCORD_ID.schema.description}\n\nMay be \`null\` if the user that last updated this role was deleted.`,
            },
            lastUpdatedAt: ISO_STRING.schema,
        },
        required: [
            "id",
            "name",
            "icon",
            "category",
            "level",
            "permissions",
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
        id: ROLE_ID.validate,
        name: (input) => validateString(input, 0, 64),
        icon: (input) => validateString(input, 0, 64),
        category: (input) => validateString(input, 0, 64),
        level: ROLE_LEVEL.validate,
        permissions: PERMISSIONS_OBJECT.validate.bind(PERMISSIONS_OBJECT),
        createdBy: (input) => input === null || DISCORD_ID.validate(input),
        createdAt: ISO_STRING.validate,
        lastUpdatedBy: (input) => input === null || DISCORD_ID.validate(input),
        lastUpdatedAt: ISO_STRING.validate,
    },
} as const satisfies SpecObjectFor<Role>;

export type RoleBasic = Pick<Role, "level" | "permissions">;

export type RolePayload = Omit<
    Role,
    "id" | "createdBy" | "createdAt" | "lastUpdatedBy" | "lastUpdatedAt"
>;

export const ROLE_PAYLOAD: SpecObjectFor<RolePayload> = omit(
    ROLE,
    "id",
    "createdBy",
    "createdAt",
    "lastUpdatedBy",
    "lastUpdatedAt",
);
