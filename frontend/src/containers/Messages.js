import { connect } from 'react-redux';
import Messages from 'src/components/Messages';

import { sendMessage } from 'src/actions/activity';

const mapStateToProps = (state, ownProps) => ({
  messages: state.activity.activity.messages,
  isMessageSending: state.activity.isMessageSending,
  userId: state.login.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (message) => {
    dispatch(sendMessage(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
