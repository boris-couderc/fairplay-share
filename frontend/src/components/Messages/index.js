import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

import Button from 'src/components/Button'
import Icon from 'src/components/Icon'
import Loader from 'src/components/Loader'

import './style.scss'

const Messages = ({
    messages, 
    sendMessage, 
    userId, 
    activityId,
    isMessageSending,
}) => {
    const [inputValue, setInputValue] = useState('')

    const handleClickForm = (e) => {
        e.preventDefault()
        if(inputValue.length > 1) {
            sendMessage({
                comment: inputValue,
                activityId: parseInt(activityId),
            })
            setInputValue('')
        }
    }

    const handleOnChange = (e) => {
        setInputValue(e.target.value)
    }

    const inputMessage = useRef(null)
    const handleClickEmpty = (e) => {
        inputMessage.current.focus()
    }

    return (
        <div className="messages">
            <div className="messages__container">
                {messages.length > 0 ? (
                    <div className="messages__container-inner">
                        {messages.map((message) => {
                            return (
                                <div
                                    key={`message-${message.id}`}
                                    className={
                                        message.user.id == userId
                                            ? 'message message--logged-user'
                                            : 'message'
                                    }
                                >
                                    <div className="message__content">
                                        {message.comment}
                                    </div>
                                    <div className="message__author">
                                        <span className="message__pseudo">
                                            {message.user.id == userId ? (
                                                <>
                                                    <Icon
                                                        name="check"
                                                        classProps="message__pseudo-icon"
                                                    ></Icon>
                                                </>
                                            ) : (
                                                <>{message.user.pseudo}</>
                                            )}
                                        </span>{' '}
                                        <span className="message__date">
                                            {message.created_at}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="messages__empty" onClick={handleClickEmpty}>
                        <Icon
                            name="explore"
                            classProps="messages__empty-icon"
                        />
                        <div className="messages__empty-txt">
                            Une question, un message ?<br />
                        </div>
                    </div>
                )}
            </div>
            <form
                action=""
                onSubmit={handleClickForm}
                className="messages__form"
            >
                <div className="messages__input">
                    <input
                        className="input input--messages"
                        type="text"
                        onChange={handleOnChange}
                        value={inputValue}
                        placeholder="Ecrire un message"
                        ref={inputMessage}
                    />
                    {isMessageSending && (
                        <Loader classProps="messages__loader" />
                    )}
                </div>
                <Button 
                    appearance="primary" 
                    classProps="" 
                    type="submit"
                >
                    Envoyer
                </Button>
            </form>
        </div>
    )
}

Messages.propTypes = {
    messages: PropTypes.array.isRequired,
    sendMessage: PropTypes.func.isRequired,
    userId: PropTypes.number,
    activityId: PropTypes.number.isRequired,
    isMessageSending: PropTypes.bool.isRequired,
}

Messages.defaultProps = {
    userId: null,
}

export default Messages
