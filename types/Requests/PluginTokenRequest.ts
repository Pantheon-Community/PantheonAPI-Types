import { pick } from "../../utils/specHelpers";
import { PLUGIN_TOKEN_OBJECT, type PluginTokenObject } from "../PluginToken";
import type { SpecObjectFor } from "../Util";

export type PluginTokenRequest = Pick<PluginTokenObject, "label">;

export const PLUGIN_TOKEN_REQUEST: SpecObjectFor<Pick<PluginTokenObject, "label">> = pick(
    PLUGIN_TOKEN_OBJECT,
    "label",
);
