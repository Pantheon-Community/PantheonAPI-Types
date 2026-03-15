import type { RoleLevel } from "../types/Common";
import { GeneralPermissions } from "../types/Permissions/GeneralPermissions";
import type { PermissionsObject } from "../types/Permissions/PermissionsObject";
import { UserPermissions } from "../types/Permissions/UserPermissions";
import type { RoleBasic } from "../types/Role";

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

export function hasPermission<T extends GeneralPermissions | UserPermissions>(
    source: T,
    target: T,
): boolean {
    return (source & target) === target;
}

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
