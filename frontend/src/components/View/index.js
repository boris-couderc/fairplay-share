import React from 'react'
import PropTypes from 'prop-types'

import Header from 'src/containers/Header'
import Footer from 'src/components/Footer'
import LoginModal from 'src/containers/LoginModal'

import './style.scss'
import sports from 'src/assets/sports/sports'

const View = ({ children, layoutClass, backgroundImg }) => {
    return (
        <div className={`view view--${layoutClass}`}>
            {backgroundImg && (
                <div 
                    className="view__background"
                    style={{
                        backgroundImage: `url(${sports[backgroundImg]})`,
                    }}
                ></div>
            )}
            <Header />
            <main className="main">{children}</main>
            <Footer />
            <LoginModal />
        </div>
    )
}

View.propTypes = {
    children: PropTypes.node.isRequired,
    backgroundImg: PropTypes.string,
}

View.defaultProps = {
    layoutClass: '',
    backgroundImg: null,
}

export default View
