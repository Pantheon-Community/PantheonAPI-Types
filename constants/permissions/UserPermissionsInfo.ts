import { UserPermissions } from "../../types/Permissions/UserPermissions";
import { NONE, type PermissionsInfo } from "./PermissionsInfo";

export const UserPermissionsInfo: Record<UserPermissions, PermissionsInfo> = {
    [UserPermissions.None]: NONE,

    [UserPermissions.ViewAll]: {
        name: "View All",
        description: "See all registered users. Includes their Discord ID, username, and avatar.",
    },

    [UserPermissions.ViewConnections]: {
        name: "View Connections",
        description:
            "See the primary Steam connection of users. Includes their Steam ID, username, and avatar.",
    },

    [UserPermissions.DeletePrimaryConnection]: {
        name: "Delete Primary Connection",
        description:
            "Delete their primary Steam connection, removing the association between their Discord and Steam account.",
    },

    [UserPermissions.ViewAnalytics]: {
        name: "View Analytics",
        description:
            "See when a user was first and last seen, and their total action count on the site.",
    },

    [UserPermissions.ViewSessions]: {
        name: "View Sessions",
        description: "See sensitive user login information like IP address and browser.",
    },

    [UserPermissions.DeleteSessions]: {
        name: "Delete Sessions",
        description: "Delete sessions of other users, effectively logging them out from the site.",
    },

    [UserPermissions.ManageRoles]: {
        name: "Manage Roles",
        description: "Add and remove roles from other users and themselves.",
    },
};
