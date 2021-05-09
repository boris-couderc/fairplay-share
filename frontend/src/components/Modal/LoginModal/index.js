import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Icon from 'src/components/Icon'

import useVisible from 'src/hooks/useVisible'

import '../style.scss'

const LoginModal = ({ isDisplayed, closeModal }) => {
    const { ref, isVisible, setIsVisible } = useVisible(false)

    useEffect(() => {
        if (!isVisible) {
            closeModal()
        }
    }, [isVisible])

    useEffect(() => {
        if (isDisplayed) {
            setIsVisible(true)
        }
    }, [isDisplayed])

    return (
        <>
            {isDisplayed && (
                <div className="modal">
                    <div className="modal__container" ref={ref}>
                        {/* <img onClick={closeModal} src={cross} alt="" className="icon modal__bt-close" /> */}
                        <button onClick={closeModal} className="modal__button-close">
                            <Icon name="clear" />
                        </button>
                        <Heading el="p" like="h4">
                            Inscris-toi !
                        </Heading>
                        <p>
                            Pour rejoindre ou organiser une activité
                        </p>
                        <div className="modal__buttons">
                            <Button appearance="outline" route="/connexion">
                                Connexion
                            </Button>
                            <Button appearance="primary" route="/inscription">
                                Inscription
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

LoginModal.propTypes = {
    isDisplayed: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
}

export default LoginModal
