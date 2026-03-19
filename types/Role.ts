import type { PermissionsObject } from "./Permissions/PermissionsObject";
import type { Brand } from "./Util";

export type RoleId = Brand<number, "roleId">;

export type RoleLevel = Brand<number, "roleLevel">;

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
