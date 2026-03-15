import type { RoleId, RoleLevel } from "./Common";
import type { PermissionsObject } from "./Permissions/PermissionsObject";

export interface RoleBasic {
    readonly level: RoleLevel;

    readonly permissions: PermissionsObject;
}

export interface RoleWithoutId extends RoleBasic {
    readonly name: string;

    readonly icon: string | null;

    readonly category: string | null;
}

export interface Role extends RoleWithoutId {
    readonly id: RoleId;
}
