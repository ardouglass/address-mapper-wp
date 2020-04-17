import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import CSVUpload from 'components/CSVUpload';
import UploadProgress from 'components/UploadProgress';
import styles from './AddressesPage.css';

function AddressesPage({
  numberOfAddresses,
  lastUpdatedDate,
  lastUpdatedUser,
  currentlyProcessing,
  errorsProcessing,
  percentComplete,
  processingState,
  acceptUpload,
  rejectUpload,
  resetUploader,
}) {
  const generateLastUpdatedDateString = () => {
    if (lastUpdatedDate.getTime() === new Date(null).getTime()) {
      return 'Never';
    }
    return `${formatDistanceStrict(new Date(), lastUpdatedDate, {
      roundingMethod: 'floor',
    })}`;
  };

  const [calculatedLastUpdate, setCalculatedLastUpdate] = useState(
    generateLastUpdatedDateString
  );

  // Make the last updated time stay accurate without refreshing the page
  useEffect(() => {
    const timer = setInterval(() => {
      setCalculatedLastUpdate(generateLastUpdatedDateString());
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <React.Fragment>
      <div className={styles.metrics}>
        <div className={clsx('card', styles.card, styles.success)}>
          <FontAwesomeIcon
            icon="map-marker-check"
            className={styles.icon}
            fixedWidth
            size="lg"
          />
          <h2 className={styles.value}>{numberOfAddresses}</h2>
          <h3 className={styles.label}>
            Mapped Address{numberOfAddresses !== 1 && 'es'}
          </h3>
        </div>

        <div className={clsx('card', styles.card, styles.info)}>
          <FontAwesomeIcon
            icon="calendar-alt"
            className={styles.icon}
            fixedWidth
            size="lg"
          />
          <h2 className={styles.value}>{calculatedLastUpdate}</h2>
          <h3 className={styles.label}>Since Last Update</h3>
        </div>

        <div className={clsx('card', styles.card, styles.special)}>
          <FontAwesomeIcon
            icon="user"
            className={styles.icon}
            fixedWidth
            size="lg"
          />
          <h2 className={styles.value}>{lastUpdatedUser}</h2>
          <h3 className={styles.label}>Updated Last</h3>
        </div>
      </div>

      {currentlyProcessing ? (
        <UploadProgress
          errorsProcessing={errorsProcessing}
          percentComplete={percentComplete}
          processingState={processingState}
          resetUploader={resetUploader}
        />
      ) : (
        <CSVUpload acceptUpload={acceptUpload} rejectUpload={rejectUpload} />
      )}
    </React.Fragment>
  );
}

AddressesPage.propTypes = {
  numberOfAddresses: PropTypes.number.isRequired,
  lastUpdatedDate: PropTypes.instanceOf(Date).isRequired,
  lastUpdatedUser: PropTypes.string.isRequired,
  currentlyProcessing: PropTypes.bool.isRequired,
  errorsProcessing: PropTypes.bool.isRequired,
  percentComplete: PropTypes.number.isRequired,
  processingState: PropTypes.string.isRequired,
  acceptUpload: PropTypes.func.isRequired,
  rejectUpload: PropTypes.func.isRequired,
  resetUploader: PropTypes.func.isRequired,
};

export default AddressesPage;
