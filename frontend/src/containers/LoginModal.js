import { connect } from 'react-redux'
import LoginModal from 'src/components/Modal/LoginModal'
import { closeModal } from 'src/actions/login'

const mapStateToProps = (state) => ({
    isDisplayed: state.loginModal.isDisplayed,
})

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        dispatch(closeModal())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
