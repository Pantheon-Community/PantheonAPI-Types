import type { RoleId, RoleLevel } from "./Common";
import type { PermissionsObject } from "./Permissions/PermissionsObject";

export interface Role {
    readonly id: RoleId;

    readonly name: string;

    readonly icon: string | null;

    readonly category: string | null;

    readonly level: RoleLevel;

    readonly permissions: PermissionsObject;
}
