import { GeneralPermissions } from "../types/Permissions/GeneralPermissions";
import type { PermissionsObject } from "../types/Permissions/PermissionsObject";
import { UserPermissions } from "../types/Permissions/UserPermissions";
import type { RoleBasic, RoleLevel } from "../types/Role";

export interface FlattenedPermissions extends PermissionsObject {
    highestRoleLevel: RoleLevel;
}

function getAll(x: Record<string | number, string | number>): number {
    const biggest = Math.max(...Object.values(x).filter((value) => typeof value === "number"), 0);

    return (biggest << 1) - 1;
}

export const ALL_GENERAL_PERMISSIONS: GeneralPermissions = getAll(GeneralPermissions);

export const ALL_USER_PERMISSIONS: UserPermissions = getAll(UserPermissions);

export function split<T extends GeneralPermissions | UserPermissions>(permissions: T): T[] {
    let x: number = permissions;

    const values: number[] = [];

    while (x > 0) {
        const bit = x & (~x + 1);
        values.push(bit);

        x ^= bit;
    }

    return values as T[];
}

function has(source: number, target: number): boolean {
    return (source & target) === target;
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
