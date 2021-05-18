import { connect } from 'react-redux'
import Messages from 'src/components/Messages'
import { showLoginModal } from 'src/actions/activities'
import { sendMessage } from 'src/actions/activity'

const mapStateToProps = (state, ownProps) => ({
    messages: state.activity.activity.messages,
    isMessageSending: state.activity.isMessageSending,
    userId: state.login.user.id,
    isLogged: state.login.isLogged,
    isCheckedLoginLocalStorage: state.login.isCheckedLocalStorage,
})

const mapDispatchToProps = (dispatch) => ({
    sendMessage: (message) => {
        dispatch(sendMessage(message))
    },
    showLoginModal: () => {
        dispatch(showLoginModal())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
