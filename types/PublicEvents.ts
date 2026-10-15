import type { SpecObject } from "./Util";
import type { OAS } from "../global/OAS";

export type PublicEventServerId = "1" | "2";
export const PUBLIC_EVENT_CATEGORIES = ["pvp", "survival", "minigame", "modifier"] as const;
export type PublicEventCategory = (typeof PUBLIC_EVENT_CATEGORIES)[number];
export type PublicEventStatus = "queued" | "reserved" | "starting" | "uncertain";
export interface PublicEventCatalog {
    /** Command-based event restriction: donors OR trusted Bots staff may buy. Not user donor status. */
    requiresDonor: boolean;
    requiresStaff: boolean;
    comingSoon: boolean;
    category: PublicEventCategory;
    id: number;
    name: string;
    description: string;
    image: string | null;
    cost: number;
}
export interface PublicEventCatalogPayload {
    category: PublicEventCategory;
    name: string;
    description: string;
    image: string | null;
    cost: number;
    command: string;
    enabled: boolean;
}
export interface PublicEventAdminCatalog extends PublicEventCatalog, PublicEventCatalogPayload {
    supported: boolean;
}
export interface PublicEventPurchase {
    eventId: number;
    serverId: PublicEventServerId;
    expectedPrice: number;
    requestId: string;
}
export interface PublicEventPurchaseResult {
    orderId: number;
    balance: number;
    pendingCount: number;
}
export interface PublicEventServer {
    id: PublicEventServerId;
    name: string;
    enabled: boolean;
    online: boolean;
    pendingCount: number;
    gapRemaining: number;
}
export interface PublicEventQueueItem {
    id: number;
    eventName: string;
    serverId: string;
    serverName: string;
    purchaserName: string;
    createdAt: string;
    status: PublicEventStatus;
    position: number;
    repeatDeferral: "none" | "moved" | "waiting";
}
export interface PublicEventReservation {
    orderId: number;
    deliveryId: string;
    command: string;
    eventName: string;
    status: "reserved" | "starting" | "uncertain";
}
export interface PublicEventRoundResult {
    serverId: string;
    roundId: string;
    roundNumber: number;
    gapRemaining: number;
    reservation: PublicEventReservation | null;
}
export interface PublicEventRound {
    instanceId: string;
    roundId: string;
    phase: "prepare" | "started" | "ended";
}
export interface PublicEventDelivery {
    instanceId: string;
    roundId: string;
    deliveryId: string;
}
export interface PublicEventResult extends PublicEventDelivery {
    outcome: "started" | "deferred" | "uncertain";
    message: string;
}

export function eventString(maxLength: number, minLength = 0): SpecObject {
    return {
        schema: { type: "string", minLength, maxLength },
        validate(value) {
            if (typeof value !== "string" || value.length < minLength || value.length > maxLength)
                throw new Error("Invalid string length/type");
        },
    };
}
export function eventInteger(minimum = 0, maximum = 2147483647, defaultValue?: number): SpecObject {
    return {
        schema: {
            type: "integer",
            minimum,
            maximum,
            ...(defaultValue === undefined ? {} : { default: defaultValue }),
        },
        validate(value) {
            if (
                !Number.isInteger(value) ||
                typeof value !== "number" ||
                value < minimum ||
                value > maximum
            )
                throw new Error("Invalid integer");
        },
    };
}
export function eventEnum(values: string[]): SpecObject {
    return {
        schema: { type: "string", enum: values },
        validate(value) {
            if (typeof value !== "string" || !values.includes(value))
                throw new Error("Invalid enum value");
        },
    };
}
export const EVENT_UUID: SpecObject = {
    schema: { type: "string", format: "uuid" },
    validate(value) {
        if (
            typeof value !== "string" ||
            !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
        )
            throw new Error("Expected UUID");
    },
};
export const EVENT_BOOLEAN: SpecObject = {
    schema: { type: "boolean" },
    validate(value) {
        if (typeof value !== "boolean") throw new Error("Expected boolean");
    },
};
export function eventNullable(spec: SpecObject): SpecObject {
    return {
        schema: { ...spec.schema, nullable: true },
        validate(value) {
            if (value !== null) spec.validate(value);
        },
    };
}
export function eventObject(
    fields: Record<string, SpecObject>,
    optional: string[] = [],
): SpecObject {
    return {
        schema: {
            type: "object",
            properties: Object.fromEntries(
                Object.entries(fields).map(([k, v]) => [k, v.schema]),
            ) as Record<string, OAS.Schema>,
            required: Object.keys(fields).filter((k) => !optional.includes(k)),
            additionalProperties: false,
        },
        validate(value) {
            if (!value || typeof value !== "object" || Array.isArray(value))
                throw new Error("Expected object");
            const record = value as Record<string, unknown>;
            for (const key of Object.keys(record))
                if (!(key in fields)) throw new Error(`Unknown property ${key}`);
            for (const [key, spec] of Object.entries(fields)) {
                if (record[key] === undefined && optional.includes(key)) continue;
                spec.validate(record[key]);
            }
        },
    };
}
export const EVENT_SERVER_ID = eventEnum(["1", "2"]);
export const EVENT_ORDER_ID = eventInteger(1);
export const EVENT_ITEM_ID = eventInteger(1);
export const EVENT_CATEGORY = eventEnum([...PUBLIC_EVENT_CATEGORIES]);
export const EVENT_CATALOG_PAYLOAD = eventObject({
    category: EVENT_CATEGORY,
    name: eventString(120, 1),
    description: eventString(4000),
    image: eventNullable(eventString(2000)),
    cost: eventInteger(),
    command: eventString(100, 1),
    enabled: EVENT_BOOLEAN,
});
export const EVENT_PURCHASE = eventObject({
    eventId: eventInteger(1),
    serverId: EVENT_SERVER_ID,
    expectedPrice: eventInteger(),
    requestId: EVENT_UUID,
});
export const EVENT_HEARTBEAT = eventObject({ instanceId: EVENT_UUID });
export const EVENT_ROUND = eventObject({
    instanceId: EVENT_UUID,
    roundId: EVENT_UUID,
    phase: eventEnum(["prepare", "started", "ended"]),
});
export const EVENT_DELIVERY = eventObject({
    instanceId: EVENT_UUID,
    roundId: EVENT_UUID,
    deliveryId: EVENT_UUID,
});
export const EVENT_RESULT = eventObject({
    instanceId: EVENT_UUID,
    roundId: EVENT_UUID,
    deliveryId: EVENT_UUID,
    outcome: eventEnum(["started", "deferred", "uncertain"]),
    message: eventString(1000),
});
export const EVENT_RECONCILE = eventObject({
    outcome: eventEnum(["started", "retry"]),
    reason: eventString(2000, 1),
});
export const EVENT_CANCEL = eventObject({ reason: eventString(2000, 1) });
export const EVENT_SERVER_PATCH = eventObject({
    enabled: EVENT_BOOLEAN,
    pluginTokenId: eventNullable(eventInteger(1)),
});
export const EVENT_PAGINATION = eventObject(
    {
        page: eventInteger(0, 1000000, 0),
        perPage: eventInteger(1, 100, 8),
        serverId: EVENT_SERVER_ID,
    },
    ["serverId"],
);

export const EVENT_CATALOG = eventObject({
    comingSoon: EVENT_BOOLEAN,
    requiresStaff: EVENT_BOOLEAN,
    requiresDonor: EVENT_BOOLEAN,
    category: EVENT_CATEGORY,
    id: eventInteger(1),
    name: eventString(120),
    description: eventString(4000),
    image: eventNullable(eventString(2000)),
    cost: eventInteger(),
});
export const EVENT_ADMIN_CATALOG = eventObject({
    comingSoon: EVENT_BOOLEAN,
    requiresStaff: EVENT_BOOLEAN,
    requiresDonor: EVENT_BOOLEAN,
    category: EVENT_CATEGORY,
    supported: EVENT_BOOLEAN,
    id: eventInteger(1),
    name: eventString(120),
    description: eventString(4000),
    image: eventNullable(eventString(2000)),
    cost: eventInteger(),
    command: eventString(100),
    enabled: EVENT_BOOLEAN,
});
export const EVENT_PUBLIC_SERVER = eventObject({
    id: EVENT_SERVER_ID,
    name: eventString(120),
    enabled: EVENT_BOOLEAN,
    online: EVENT_BOOLEAN,
    pendingCount: eventInteger(0),
    gapRemaining: eventInteger(0),
});
export const EVENT_ADMIN_SERVER = eventObject({
    id: EVENT_SERVER_ID,
    name: eventString(120),
    enabled: EVENT_BOOLEAN,
    online: EVENT_BOOLEAN,
    pendingCount: eventInteger(0),
    gapRemaining: eventInteger(0),
    pluginTokenId: eventNullable(eventInteger(1)),
    currentRound: eventNullable(EVENT_UUID),
    roundNumber: eventInteger(0),
    lastPaidRoundNumber: eventNullable(eventInteger(0)),
});
export const EVENT_QUEUE_ITEM = eventObject({
    id: eventInteger(1),
    eventName: eventString(120),
    serverId: eventString(1),
    serverName: eventString(120),
    purchaserName: eventString(200),
    createdAt: eventString(40),
    status: eventString(20),
    position: eventInteger(1),
    repeatDeferral: eventEnum(["none", "moved", "waiting"]),
});
export const EVENT_QUEUE_RESPONSE = eventObject({
    items: {
        schema: { type: "array", items: EVENT_QUEUE_ITEM.schema },
        validate(value) {
            if (!Array.isArray(value)) throw new Error("Expected array");
            for (const item of value) EVENT_QUEUE_ITEM.validate(item);
        },
    },
    totalItemCount: eventInteger(0),
});
export const EVENT_PURCHASE_RESULT = eventObject({
    orderId: eventInteger(1),
    balance: eventInteger(0),
    pendingCount: eventInteger(0),
});
export const EVENT_OK = eventObject({ ok: EVENT_BOOLEAN });
export const EVENT_AUTHORIZED = eventObject({ authorized: EVENT_BOOLEAN });
export const EVENT_RESERVATION = eventObject({
    orderId: eventInteger(1),
    deliveryId: EVENT_UUID,
    command: eventString(100),
    eventName: eventString(120),
    status: eventEnum(["reserved", "starting", "uncertain"]),
});
export const EVENT_ROUND_RESULT = eventObject({
    serverId: eventString(1),
    roundId: EVENT_UUID,
    roundNumber: eventInteger(0),
    gapRemaining: eventInteger(0),
    reservation: eventNullable(EVENT_RESERVATION),
});
export const EVENT_ADMIN_ORDER = eventObject({
    id: eventInteger(1),
    buyerId: eventString(40),
    eventName: eventString(120),
    command: eventString(100),
    serverId: eventString(1),
    serverName: eventString(120),
    purchaserName: eventString(200),
    cost: eventInteger(),
    balanceAfter: eventInteger(0),
    createdAt: eventString(40),
    status: eventString(20),
    position: eventInteger(1),
    repeatDeferral: eventEnum(["none", "moved", "waiting"]),
    message: eventString(4000),
    delivery: eventNullable(
        eventObject({
            id: EVENT_UUID,
            roundId: EVENT_UUID,
            roundNumber: eventInteger(0),
            instanceId: EVENT_UUID,
            status: eventString(20),
            leaseUntil: eventString(40),
            authorizedAt: eventNullable(eventString(40)),
            outcome: eventNullable(eventString(20)),
            message: eventNullable(eventString(4000)),
        }),
    ),
    audits: {
        schema: {
            type: "array",
            items: eventObject({
                actorId: eventString(40),
                outcome: eventString(40),
                reason: eventString(2000),
                createdAt: eventString(40),
            }).schema,
        },
        validate(value) {
            if (!Array.isArray(value)) throw new Error("Expected array");
        },
    },
});
export const EVENT_ADMIN_ORDERS_RESPONSE = eventObject({
    items: {
        schema: { type: "array", items: EVENT_ADMIN_ORDER.schema },
        validate(value) {
            if (!Array.isArray(value)) throw new Error("Expected array");
            for (const item of value) EVENT_ADMIN_ORDER.validate(item);
        },
    },
    totalItemCount: eventInteger(0),
});
