/** biome-ignore-all lint/style/useNamingConvention: Built-in Types */

import type { IsoString } from "./Common";

declare global {
	interface Date {
		toISOString(): IsoString;
	}
}
