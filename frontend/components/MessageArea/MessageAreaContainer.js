import {connect} from 'react-redux';
import {clearStatusMessage} from 'store/statusMessages/actions';
import MessageArea from './MessageArea';

const mapStateToProps = state => ({
  messages: state.statusMessages,
});

const mapDispatchToProps = dispatch => ({
  removeMessageByIndex: index => dispatch(clearStatusMessage(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageArea);
