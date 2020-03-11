import {connect} from 'react-redux';
import {setGoogleMapsApiKey} from 'store/settings/actions';
import SettingsPage from './SettingsPage';

const mapStateToProps = state => ({
  googleMapsApiKey: state.settings.googleMapsApiKey || '',
});

const mapDispatchToProps = dispatch => ({
  saveChanges: ({googleMapsApiKeyValue}) =>
    dispatch(setGoogleMapsApiKey({googleMapsApiKey: googleMapsApiKeyValue})),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
