import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {isFunction} from 'lodash-es';
import styles from './Message.css';

function Message({message, status, onDismiss}) {
  const dismissible = isFunction(onDismiss);

  return (
    <div
      className={clsx(
        'notice',
        `notice-${status}`,
        'inline',
        dismissible && styles.dismissible
      )}
    >
      <p>{message}</p>
      {dismissible && (
        <button
          type="button"
          className="notice-dismiss"
          onClick={() => onDismiss()}
        >
          <span className="screen-reader-text">Dismiss this notice.</span>
        </button>
      )}
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['error', 'warning', 'success', 'info']).isRequired,
  onDismiss: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

Message.defaultProps = {
  onDismiss: false,
};

export default Message;
