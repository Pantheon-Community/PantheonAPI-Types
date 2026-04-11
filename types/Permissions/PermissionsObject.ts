import { validateObject } from "../../spec/validators/object";
import type { SpecObjectFor } from "../Util";
import { GENERAL_PERMISSIONS, type GeneralPermissions } from "./GeneralPermissions";
import { USER_PERMISSIONS, type UserPermissions } from "./UserPermissions";

export interface PermissionsObject {
    generalPermissions: GeneralPermissions;

    userPermissions: UserPermissions;
}

export const PERMISSIONS_OBJECT = {
    schema: {
        type: "object",
        properties: {
            generalPermissions: GENERAL_PERMISSIONS.schema,
            userPermissions: USER_PERMISSIONS.schema,
        },
        required: ["generalPermissions", "userPermissions"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        generalPermissions: GENERAL_PERMISSIONS.validate,
        userPermissions: USER_PERMISSIONS.validate,
    },
} as const satisfies SpecObjectFor<PermissionsObject>;
