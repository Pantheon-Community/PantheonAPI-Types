import { GeneralPermissions } from "../types/Permissions/GeneralPermissions";
import type { PermissionsObject } from "../types/Permissions/PermissionsObject";
import { UserPermissions } from "../types/Permissions/UserPermissions";
import type { RoleBasic, RoleLevel } from "../types/Role";
import { has } from "./bitfieldHelpers";

export interface FlattenedPermissions extends PermissionsObject {
    highestRoleLevel: RoleLevel;
}

export function flattenPermissions(...roles: RoleBasic[]): FlattenedPermissions {
    let highestLevel: number = Number.MIN_SAFE_INTEGER;

    const output = {
        generalPermissions: GeneralPermissions.None,
        userPermissions: UserPermissions.None,
    };

    for (const role of roles) {
        highestLevel = Math.max(role.level, highestLevel);

        output.generalPermissions |= role.permissions.generalPermissions;
        output.userPermissions |= role.permissions.userPermissions;
    }

    return Object.assign(output, { highestRoleLevel: highestLevel as RoleLevel });
}

export function hasPermission(
    source: PermissionsObject,
    target: Partial<PermissionsObject>,
): boolean {
    const { generalPermissions, userPermissions } = target;

    if (generalPermissions !== undefined && !has(source.generalPermissions, generalPermissions)) {
        return false;
    }

    if (userPermissions !== undefined && !has(source.userPermissions, userPermissions)) {
        return false;
    }

    return true;
}
