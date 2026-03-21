import type { PermissionsObject } from "./Permissions/PermissionsObject";
import type { Brand } from "./Util";

export type RoleId = Brand<number, "roleId">;

export type RoleLevel = Brand<number, "roleLevel">;

export interface Role {
    readonly id: RoleId;

    readonly name: string;

    readonly icon: string | null;

    readonly level: RoleLevel;

    readonly permissions: PermissionsObject;

    readonly category: string | null;
}

export type RoleBasic = Pick<Role, "level" | "permissions">;

export type RoleInput = Omit<Role, "id">;
