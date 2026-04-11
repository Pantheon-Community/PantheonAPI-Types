import { validateInteger } from "../../spec/validators/integer";
import { getAll } from "../../utils/bitfieldHelpers";
import type { SpecObject } from "../Util";

export enum GeneralPermissions {
    None = 0,

    EditRoles = 1 << 0,

    EditTokens = 1 << 1,

    EditEconomyRewards = 1 << 2,
}

export const ALL_GENERAL_PERMISSIONS: GeneralPermissions = getAll(GeneralPermissions);

export const GENERAL_PERMISSIONS = {
    schema: {
        type: "integer",
        minimum: GeneralPermissions.None,
        maximum: ALL_GENERAL_PERMISSIONS,
    },
    validate: (input) => validateInteger(input, GeneralPermissions.None, ALL_GENERAL_PERMISSIONS),
} as const satisfies SpecObject;
