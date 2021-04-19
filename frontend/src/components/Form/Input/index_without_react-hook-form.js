import React from 'react';
import PropTypes, { func } from 'prop-types';

import './style.scss';

const Input = ({ 
    type, 
    name, 
    placeholder, 
    HandleOnChange, 
    value,
    label,
}) => {

    return type === 'checkbox' ? (
        <label className="input__checkbox-label" htmlFor={name}>
            <input
                className={`input input--checkbox`}
                type="checkbox"
                name={name}
                id={name}
                //onChange={OnChange}
            />
            {label}
        </label>
    ) : type === 'number' ? (
        <div>
            <input
                className={`input input--number`}
                type="number"
                name={name}
                value={value}
                onChange={HandleOnChange}
            />
        </div>
    ) : type === 'date' ? (
        <input
            className={`input input--date`}
            type="date"
            name={name}
            value={value}
            onChange={HandleOnChange}
        />
    ) : type === 'time' ? (
        <input
            className={`input input--time`}
            type="time"
            name={name}
            value={value}
            onChange={HandleOnChange}
        />
    ) : type === 'textarea' ? (
        <textarea
            className={`input input--textarea`}
            type="time"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={HandleOnChange}
        />
    ) : type === 'password' ? (
        <input
            className={`input input--password`}
            type="password"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={HandleOnChange}
        />
    ) : type === 'email' ? (
        <input
            className={`input input--email`}
            type="email"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={HandleOnChange}
        />
    ) : (
        <input
            className={`input`}
            type='text'
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={HandleOnChange}
        />
    )
}

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    HandleOnChange: PropTypes.func,
}

Input.defaultProps = {
    type: 'text',
    placeholder: null,
    value: '',
    label: null,
    HandleOnChange: () => {},
}

export default Input;
