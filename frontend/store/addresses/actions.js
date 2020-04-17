/**
 * Provides a helper for the ACCEPT_UPLOADED_FILES action
 * @param {File[]} files - The files to process
 * @returns {Object} The ACCEPT_UPLOADED_FILES action
 */
export const acceptUpload = files => ({
  type: 'ACCEPT_UPLOADED_FILES',
  payload: {files},
});

/**
 * Provides a helper for the REJECT_UPLOADED_FILES action
 * @param {File[]} files - The files to reject
 * @param {string} message - The reason the files were rejected
 * @returns {Object} The REJECT_UPLOADED_FILES action
 */
export const rejectUpload = (files, message) => ({
  type: 'REJECT_UPLOADED_FILES',
  payload: {files, message},
});

/**
 * Provides a helper for the COMPLETED_PARSING_CSV action
 * @param {Object[]} data - The data that was successfully parsed
 * @returns {Object} The COMPLETED_PARSING_CSV action
 */
export const completedParsingCSV = data => ({
  type: 'COMPLETED_PARSING_CSV',
  payload: {data},
});

/**
 * Provides a helper for the COMPLETED_PREPARING_DATA action
 * @param {Object[]} data - The data that was successfully prepared to geocode
 * @returns {Object} The COMPLETED_PREPARING_DATA action
 */
export const completedPreparingData = data => ({
  type: 'COMPLETED_PREPARING_DATA',
  payload: {data},
});

/**
 * Provides a helper for the BEGAN_PROCESSING_FILE action
 * @returns {Object} The BEGAN_PROCESSING_FILE action
 */
export const beganProcessingFile = () => ({
  type: 'BEGAN_PROCESSING_FILE',
});

/**
 * Provides a helper for the COMPLETED_PROCESSING_FILE action
 * @param {boolean} successful - If processing was successfully completed
 * @returns {Object} The COMPLETED_PROCESSING_FILE action
 */
export const completedProcessingFile = successful => ({
  type: 'COMPLETED_PROCESSING_FILE',
  payload: {successful},
});

/**
 * Provides a helper for the UPDATE_PROCESSING_PERCENTAGE action
 * @param {number} percentComplete - The data that was successfully prepared to geocode
 * @param {string} processingState - The current state of processing, like "uploading" or "geocoding"
 * @returns {Object} The UPDATE_PROCESSING_PERCENTAGE action
 */
export const updateProcessingPercentage = (
  percentComplete,
  processingState = ''
) => ({
  type: 'UPDATE_PROCESSING_PERCENTAGE',
  payload: {percentComplete, processingState},
});

/**
 * Provides a helper for the ADD_ADDRESSES_TO_UPLOAD_STACK action
 * @param {Object[]} addresses - The data that was successfully geocoded
 * @returns {Object} The ADD_ADDRESSES_TO_UPLOAD_STACK action
 */
export const addAddressesToUploadStack = addresses => ({
  type: 'ADD_ADDRESSES_TO_UPLOAD_STACK',
  payload: {addresses},
});

/**
 * Provides a helper for the COMPLETED_GEOCODING action
 * @returns {Object} The COMPLETED_GEOCODING action
 */
export const completedGeocoding = () => ({
  type: 'COMPLETED_GEOCODING',
});

/**
 * Provides a helper for the UPDATE_ADDRESS_META action
 * @param {Object} meta - The meta data to update
 * @returns {Object} The UPDATE_ADDRESS_META action
 */
export const updateAddressMeta = meta => ({
  type: 'UPDATE_ADDRESS_META',
  payload: {meta},
});

/**
 * Provides a helper for the RESET_UPLOADER action
 * @returns {Object} The RESET_UPLOADER action
 */
export const resetUploader = () => ({
  type: 'RESET_UPLOADER',
});
