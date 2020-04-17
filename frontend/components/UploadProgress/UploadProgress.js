import React from 'react';
import PropTypes from 'prop-types';
import {Line} from 'rc-progress';
import styles from './UploadProgress.css';

function UploadProgress({
  errorsProcessing,
  percentComplete,
  processingState,
  resetUploader,
}) {
  const processingStateText = (state => {
    switch (state) {
      case 'parsing':
        return 'Parsing CSV file...';
      case 'preparing':
        return 'Preparing data for geocoding...';
      case 'geocoding':
        return 'Geocoding data...';
      case 'uploading':
        return 'Uploading geocoded data to server...';
      case 'no_new_data':
        return 'No new data to upload.';
      case 'finished':
        return 'Finished uploading file.';
      default:
        return '';
    }
  })(processingState);

  return (
    <div>
      <Line
        percent={percentComplete}
        strokeColor={errorsProcessing ? '#dc3232' : '#389547'}
        className={styles.progressBar}
        trailColor={'#ccd0d4'}
        strokeLinecap="square"
      />
      <p className={styles.progressText}>
        {errorsProcessing ? 'An error occured.' : processingStateText}
      </p>
      {errorsProcessing && (
        <button className="button" onClick={() => resetUploader()}>
          Try Again
        </button>
      )}
      {!errorsProcessing && percentComplete === 100 && (
        <button className="button" onClick={() => resetUploader()}>
          Upload Another File
        </button>
      )}
    </div>
  );
}

UploadProgress.propTypes = {
  errorsProcessing: PropTypes.bool.isRequired,
  percentComplete: PropTypes.number.isRequired,
  processingState: PropTypes.string.isRequired,
  resetUploader: PropTypes.func.isRequired,
};

export default UploadProgress;
