import React from 'react';
import PropTypes from 'prop-types';
import Message from 'components/Message';

function MessageArea({messages, removeMessageByIndex}) {
  const messageComponents = messages.map(({message, status}, index) => (
    <Message
      message={message}
      status={status}
      onDismiss={() => removeMessageByIndex(index)}
      key={index}
    />
  ));

  return messageComponents.length ? <div>{messageComponents}</div> : null;
}

MessageArea.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(['error', 'warning', 'success', 'info']),
      message: PropTypes.string,
    })
  ),
  removeMessageByIndex: PropTypes.func.isRequired,
};

MessageArea.defaultProps = {
  messages: [],
};

export default MessageArea;
