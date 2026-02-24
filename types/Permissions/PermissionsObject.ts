import type { EconomyPermissions } from "./EconomyPermissions";
import type { GeneralPermissions } from "./GeneralPermissions";

export interface PermissionsObject {
	readonly generalPermissions: GeneralPermissions;

	readonly economyPermissions: EconomyPermissions;
}
