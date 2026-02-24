export enum EconomyPermissions {
	None = 0,

	/** See transactions of all users, not just themselves. */
	SeeTransactions = 1 << 0,

	/** Create, update, and delete shop items. */
	EditShop = 1 << 1,
}
