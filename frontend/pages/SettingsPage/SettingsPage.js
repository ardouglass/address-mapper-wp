import React, {useState} from 'react';
import PropTypes from 'prop-types';

function SettingsPage({googleMapsApiKey, saveChanges}) {
  const [googleMapsApiKeyValue, setGoogleMapsApiKeyValue] = useState(
    googleMapsApiKey
  );

  const onSubmitHandler = evt => {
    evt.preventDefault();
    saveChanges({googleMapsApiKeyValue});
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <h2>Google Maps Settings</h2>
      <table className="form-table" role="presentation">
        <tbody>
          <tr>
            <th scope="row">
              <label htmlFor="google-maps-api-key">Google Maps API key</label>
            </th>
            <td>
              <input
                name="google-maps-api-key"
                type="text"
                id="google-maps-api-key"
                className="regular-text"
                value={googleMapsApiKeyValue}
                onChange={evt => setGoogleMapsApiKeyValue(evt.target.value)}
              />
              <p className="description" id="google-maps-api-key-description">
                <a href="https://developers.google.com/maps/documentation/javascript/get-api-key">
                  Get a Google Maps API key
                </a>{' '}
                with access to the Geocoding API.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="submit">
        <input
          type="submit"
          className="button button-primary"
          value="Save Changes"
        />
      </p>
    </form>
  );
}

SettingsPage.propTypes = {
  googleMapsApiKey: PropTypes.string.isRequired,
  saveChanges: PropTypes.func.isRequired,
};

export default SettingsPage;
