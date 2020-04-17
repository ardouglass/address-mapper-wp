import {connect} from 'react-redux';
import {
  acceptUpload,
  rejectUpload,
  resetUploader,
} from 'store/addresses/actions';
import AddressesPage from './AddressesPage';

const mapStateToProps = state => ({
  numberOfAddresses: state.addresses.ids.length,
  lastUpdatedDate: state.addresses.lastUpdatedDate,
  lastUpdatedUser: state.addresses.lastUpdatedUser,
  currentlyProcessing: state.addresses.processing.currentlyProcessing,
  processingState: state.addresses.processing.processingState,
  errorsProcessing: state.addresses.processing.errorsProcessing,
  percentComplete: state.addresses.processing.percentComplete,
});

const mapDispatchToProps = dispatch => ({
  acceptUpload: files => dispatch(acceptUpload(files)),
  rejectUpload: (files, message) => dispatch(rejectUpload(files, message)),
  resetUploader: () => dispatch(resetUploader()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressesPage);
