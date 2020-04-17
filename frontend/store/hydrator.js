export const initialState = {
  addresses: {
    ids: addressMapperApiSettings.existingIds || [],
    lastUpdatedDate:
      new Date(addressMapperApiSettings.lastUpdatedDate * 1000) ||
      new Date(null),
    lastUpdatedUser: addressMapperApiSettings.lastUpdatedUser || 'Nobody',
    processing: {
      currentlyProcessing: false,
      percentComplete: 0,
      processingState: '',
      errorsProcessing: false,
    },
    readyToUpload: [],
  },
  settings: {
    googleMapsApiKey: addressMapperApiSettings.googleMapsApiKey || '',
  },
  statusMessages: [],
};
