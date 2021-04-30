import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

import Button from 'src/components/Button'
import Icon from 'src/components/Icon'

import './style.scss'

const Messages = ({ messages, sendMessage, /* userId, */ activityId }) => {
    const [inputValue, setInputValue] = useState('')

    const handleClickForm = (e) => {
        e.preventDefault()

        // console.log('activityId comp', activityId);
        // console.log('---------------------------------- userId > ', userId );

        //if(userId) {
        sendMessage({
            comment: inputValue,
            activityId: parseInt(activityId),
            //userId: parseInt(userId),
        })
        setInputValue('')

        //}
    }

    const handleOnChange = (e) => {
        setInputValue(e.target.value)
    }

    const inputMessage = useRef(null)
    const handleClickEmpty = (e) => {
        console.log('Empty')

        inputMessage.current.focus()
    }

    return (
        <div className="messages">
            <div className="messages__container">
                {messages.length > 0 ? (
                    <div className="messages__container-inner">
                        {messages.map((message, index) => {
                            return (
                                <div
                                    key={`message-${index}`}
                                    className="message"
                                >
                                    <div className="message__content">
                                        {message.comment}
                                    </div>
                                    <div className="message__author">
                                        <span className="message__pseudo">
                                            {message.users.pseudo}
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
                <input
                    className="input input--messages"
                    type="text"
                    onChange={handleOnChange}
                    value={inputValue}
                    placeholder="Ecrire un message"
                    ref={inputMessage}
                />
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
    //userId: PropTypes.number,
    activityId: PropTypes.number.isRequired,
}

/*
Messages.defaultProps = {
  userId: null,
};
*/

export default Messages
