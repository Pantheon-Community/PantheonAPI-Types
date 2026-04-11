import { INTEGER, SMALLINT } from "../spec/schemas/integer";
import { STRING } from "../spec/schemas/string";
import { validateArray } from "../spec/validators/array";
import { validateInteger, validateSmallInt } from "../spec/validators/integer";
import { validateObject } from "../spec/validators/object";
import { validateString } from "../spec/validators/string";
import { omit } from "../utils/specHelpers";
import { DISCORD_ID, ISO_STRING, type DiscordId, type IsoString } from "./Common";
import type { Brand, SpecObject, SpecObjectFor } from "./Util";

export type EconomyRewardId = Brand<number, "rewardId">;

export const ECONOMY_REWARD_ID = {
    schema: INTEGER,
    validate: validateInteger,
} as const satisfies SpecObject;

export interface EconomyRewardItem {
    /** SCP:SL item ID. */
    id: number;

    /** Item count. */
    count: number;
}

export const ECONOMY_REWARD_ITEM = {
    schema: {
        type: "object",
        properties: {
            id: {
                ...SMALLINT,
                description: "SCP:SL item ID.",
                example: 1,
            },
            count: {
                ...SMALLINT,
                minimum: 1,
            },
        },
        required: ["id", "count"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        id: validateSmallInt,
        count: (input) => validateSmallInt(input, 1),
    },
} as const satisfies SpecObjectFor<EconomyRewardItem>;

export interface EconomyReward {
    id: EconomyRewardId;

    title: string;

    subtitle: string;

    description: string;

    image: string;

    /** How much this reward **currently** costs. */
    cost: number;

    /**
     * How much this reward **normally** costs.
     *
     * This can be used to show discounts (when compared to {@link cost}).
     */
    normalCost: number;

    /** May be `null` if the user that posted this reward was deleted. */
    postedBy: DiscordId | null;

    postedAt: IsoString;

    /** May be `null` if the user that last updated this reward was deleted. */
    lastUpdatedBy: DiscordId | null;

    lastUpdatedAt: IsoString;

    /** Corresponding SCP:SL item(s) that this reward gives, may be empty. */
    items: EconomyRewardItem[];
}

export const ECONOMY_REWARD = {
    schema: {
        type: "object",
        properties: {
            id: ECONOMY_REWARD_ID.schema,
            title: STRING(1, 64, "title"),
            subtitle: STRING(0, 128, "subtitle"),
            description: STRING(0, 1024, "description"),
            image: STRING(0, 128, "image"),
            cost: {
                ...INTEGER,
                description: "How much this reward **currently** costs.",
                example: 100,
            },
            normalCost: {
                ...INTEGER,
                description:
                    "How much this reward **normally** costs.\n\nThis can be used to show discounts (when compared to **cost**).",
                example: 100,
            },
            postedBy: {
                ...DISCORD_ID.schema,
                description: `${DISCORD_ID.schema.description}\n\nMay be \`null\` if the user that posted this reward was deleted.`,
                nullable: true,
            },
            postedAt: ISO_STRING.schema,
            lastUpdatedBy: {
                ...DISCORD_ID.schema,
                description: `${DISCORD_ID.schema.description}\n\nMay be \`null\` if the user that last updated this reward was deleted.`,
                nullable: true,
            },
            lastUpdatedAt: ISO_STRING.schema,
            items: {
                type: "array",
                description: "Corresponding SCP:SL item(s) that this reward gives, may be empty.",
                items: ECONOMY_REWARD_ITEM.schema,
                minLength: 1,
                maxLength: 100,
            },
        },
        required: [
            "id",
            "title",
            "subtitle",
            "description",
            "image",
            "cost",
            "normalCost",
            "postedBy",
            "postedAt",
            "lastUpdatedBy",
            "lastUpdatedAt",
            "items",
        ],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        id: validateInteger,
        title: (input) => validateString(input, 1, 64),
        subtitle: (input) => validateString(input, 0, 128),
        description: (input) => validateString(input, 0, 1024),
        image: (input) => validateString(input, 0, 128),
        cost: validateInteger,
        normalCost: validateInteger,
        postedBy: (input) => input === null || DISCORD_ID.validate(input),
        postedAt: ISO_STRING.validate,
        lastUpdatedBy: (input) => input === null || DISCORD_ID.validate(input),
        lastUpdatedAt: ISO_STRING.validate,
        items: (input) => validateArray(input, 0, 10, (x) => ECONOMY_REWARD_ITEM.validate(x)),
    },
} as const satisfies SpecObjectFor<EconomyReward>;

export type EconomyRewardPayload = Omit<
    EconomyReward,
    "id" | "postedBy" | "postedAt" | "lastUpdatedBy" | "lastUpdatedAt"
>;

export const ECONOMY_REWARD_PAYLOAD: SpecObjectFor<EconomyRewardPayload> = omit(
    ECONOMY_REWARD,
    "id",
    "postedBy",
    "postedAt",
    "lastUpdatedBy",
    "lastUpdatedAt",
);
