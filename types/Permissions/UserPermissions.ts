import { validateInteger } from "../../spec/validators/integer";
import { getAll } from "../../utils/bitfieldHelpers";
import type { SpecObject } from "../Util";

export enum UserPermissions {
    None = 0,

    ViewAll = 1 << 0,

    ViewConnections = 1 << 1,

    DeletePrimaryConnection = 1 << 2,

    ViewAnalytics = 1 << 3,

    ViewSessions = 1 << 4,

    DeleteSessions = 1 << 5,

    ManageRoles = 1 << 6,
}

export const ALL_USER_PERMISSIONS: UserPermissions = getAll(UserPermissions);

export const USER_PERMISSIONS = {
    schema: {
        type: "integer",
        minimum: UserPermissions.None,
        maximum: ALL_USER_PERMISSIONS,
    },
    validate: (input) => validateInteger(input, UserPermissions.None, ALL_USER_PERMISSIONS),
} as const satisfies SpecObject;
