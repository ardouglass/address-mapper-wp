/*
 * Direct selectors
 */
export const getIds = state => state.addresses.ids;
export const getLastUpdatedDate = state => state.addresses.lastUpdatedDate;
export const getLastUpdatedUser = state => state.addresses.lastUpdatedUser;
export const getReadyToUpload = state => state.addresses.readyToUpload;
export const getPercentComplete = state =>
  state.addresses.processing.percentComplete;
