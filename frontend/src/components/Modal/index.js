import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Icon from 'src/components/Icon'

import useVisible from 'src/hooks/useVisible'

import './style.scss'

const Modal = ({
    isDisplayed,
    icon,
    title,
    txt,
    txtBtYes,
    txtBtNo,
    onClickYes,
    onClickNo,
    closeModal,
}) => {
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
                        <button
                            onClick={closeModal}
                            className="modal__button-close"
                        >
                            <Icon name="clear" />
                        </button>
                        <Icon name={icon} classProps="modal__icon" />
                        <Heading el="p" like="h4">
                            {title}
                        </Heading>
                        {txt && <p>{txt}</p>}
                        <div className="modal__buttons">
                            <Button appearance="outline" onClick={onClickNo}>
                                {txtBtNo}
                            </Button>
                            <Button appearance="primary" onClick={onClickYes}>
                                {txtBtYes}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

Modal.propTypes = {
    isDisplayed: PropTypes.bool.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    txt: PropTypes.string,
    txtBtYes: PropTypes.string.isRequired,
    txtBtNo: PropTypes.string,
    onClickYes: PropTypes.func.isRequired,
    onClickNo: PropTypes.func,
    closeModal: PropTypes.func.isRequired,
}

Modal.defaultProps = {
    icon: PropTypes.string.isRequired,
    txt: null,
    txtBtNo: null,
    onClickNo: () => {},
}

export default Modal
