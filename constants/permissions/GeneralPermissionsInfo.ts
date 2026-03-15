import { GeneralPermissions } from "../../types/Permissions/GeneralPermissions";
import { NONE, type PermissionsInfo } from "./PermissionsInfo";

export const GeneralPermissionInfo: Record<GeneralPermissions, PermissionsInfo> = {
    [GeneralPermissions.None]: NONE,

    [GeneralPermissions.EditRoles]: {
        name: "Edit Roles",
        description: "Create, delete, and edit roles.",
    },
};
