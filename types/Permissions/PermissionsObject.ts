import type { GeneralPermissions } from "./GeneralPermissions";
import type { UserPermissions } from "./UserPermissions";

export interface PermissionsObject {
    readonly generalPermissions: GeneralPermissions;

    readonly userPermissions: UserPermissions;
}
