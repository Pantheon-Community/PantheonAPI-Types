import type { PermissionsInfo } from "./PermissionsInfo";

export const Categories = {
    GeneralPermissions: {
        name: "General Permissions",
        description: "Non-specific or not common enough for their own grouping.",
    },
    UserPermissions: {
        name: "User Permissions",
        description: "Viewing and management of other users.",
    },
} as const satisfies Record<string, PermissionsInfo>;
