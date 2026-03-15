import type { PermissionsInfo } from "./PermissionsInfo";

export const Categories = {
    UserPermissions: {
        name: "User Permissions",
        description: "Viewing and management of other users.",
    },
} as const satisfies Record<string, PermissionsInfo>;
