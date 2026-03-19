import { GeneralPermissions } from "../types/Permissions/GeneralPermissions";
import type { PermissionsObject } from "../types/Permissions/PermissionsObject";
import { UserPermissions } from "../types/Permissions/UserPermissions";
import type { RoleBasic, RoleLevel } from "../types/Role";

export interface FlattenedPermissions extends PermissionsObject {
    highestRoleLevel: RoleLevel;
}

function biggestValue(x: Record<string | number, string | number>): number {
    let biggest = 0;

    for (const value of Object.values(x)) {
        if (typeof value === "number") {
            biggest = Math.max(biggest, value);
        }
    }

    return (biggest << 1) - 1;
}

export const ALL_GENERAL_PERMISSIONS: GeneralPermissions = biggestValue(GeneralPermissions);

export const ALL_USER_PERMISSIONS: UserPermissions = biggestValue(UserPermissions);

export function split<T extends GeneralPermissions | UserPermissions>(x: T): T[] {
    const values: T[] = [];

    while (x > 0) {
        const bit = x & (~x + 1);
        values.push(bit as T);

        // @ts-expect-error
        x ^= bit;
    }

    return values;
}

function hasPermissionInternal(source: number, target: number): boolean {
    return (source & target) === target;
}

export function hasPermission(
    source: FlattenedPermissions,
    target: Partial<PermissionsObject>,
): boolean {
    const { generalPermissions, userPermissions } = target;

    if (
        generalPermissions !== undefined &&
        !hasPermissionInternal(source.generalPermissions, generalPermissions)
    ) {
        return false;
    }

    if (
        userPermissions !== undefined &&
        !hasPermissionInternal(source.userPermissions, userPermissions)
    ) {
        return false;
    }

    return true;
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
