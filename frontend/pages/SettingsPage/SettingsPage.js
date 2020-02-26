import React from 'react';

function SettingsPage() {
  return (
    <div>
      <h2>Google Maps Settings</h2>
      <table className="form-table" role="presentation">
        <tbody>
          <tr>
            <th scope="row">
              <label htmlFor="googlemaps-api-key">Google Maps API key</label>
            </th>
            <td>
              <input
                name="googlemaps-api-key"
                type="text"
                id="googlemaps-api-key"
                className="regular-text"
              />
              <p className="description" id="googlemaps-api-key-description">
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
        <button className="button button-primary">Save Changes</button>
      </p>
    </div>
  );
}

export default SettingsPage;
