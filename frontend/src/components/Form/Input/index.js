import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Input = ({ type, placeholder }) => {

    return type === 'checkbox' ? (
        <div>
            <input
                className={`input input--checkbox`}
                type="checkbox"
                //id={id}
                //name={name}
            />
            <label className="input__checkbox-label" /*htmlFor={id}*/>
                {/*text*/}
                text
            </label>
        </div>
    ) : type === 'number' ? (
        <div>
            <input
                className={`input input--number`}
                type="number"
                //placeholder={placeholder}
                //id={id}
                //name={name}
            />
        </div>
    ) : type === 'date' ? (
        <input
            className={`input input--date`}
            type="date"
            //id={id}
            //name={name}
        />
    ) : type === 'time' ? (
        <input
            className={`input input--time`}
            type="time"
            //id={id}
            //name={name}
        />
    ) : type === 'textarea' ? (
        <textarea
            className={`input input--textarea`}
            type="time"
            placeholder={placeholder}
            //id={id}
            //name={name}
        />
    ) : type === 'password' ? (
        <input
            className={`input input--password`}
            type="password"
            placeholder={placeholder}
            //id={id}
            //name={name}
        />
    ) : (
        <input
            className={`input`}
            type='text'
            placeholder={placeholder}
        />
    )
}

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
}

Input.defaultProps = {
    type: 'text',
    placeholder: null,
}

export default Input;
