import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {useDropzone} from 'react-dropzone';
import clsx from 'clsx';
import {requiredFields} from 'utils/dataProcessing/parseCSV';
import styles from './CSVUpload.css';

function CSVUpload({acceptUpload, rejectUpload}) {
  const onDropRejected = useCallback(
    rejectedFiles =>
      rejectUpload(rejectedFiles, 'You can only upload one file at a time.'),
    []
  );
  const onDropAccepted = useCallback(
    acceptedFiles => acceptUpload(acceptedFiles),
    []
  );

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDropAccepted,
    onDropRejected,
    multiple: false,
  });

  const uploadCSSClasses = clsx(
    styles.dropzone,
    isDragActive && styles.activeDropzone
  );

  return (
    <React.Fragment>
      <div className={uploadCSSClasses} {...getRootProps()}>
        <input {...getInputProps()} accept=".csv" />

        <div className={styles.dropzoneDetails}>
          <p className={styles.dropzoneHeader}>Drop .csv file to upload</p>
          <p>or</p>
          <p>
            <button className="button">Select .csv File</button>
          </p>
        </div>
      </div>

      <p>
        Your .csv file must contain the following fields:{' '}
        {requiredFields.join(', ')}.
      </p>
    </React.Fragment>
  );
}

CSVUpload.propTypes = {
  acceptUpload: PropTypes.func.isRequired,
  rejectUpload: PropTypes.func.isRequired,
};

export default CSVUpload;
