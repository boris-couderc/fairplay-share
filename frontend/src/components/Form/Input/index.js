import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const EMAIL_REGEX = /^((\w[^\W]+)[\.\-]?){1,}\@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

const Input = ({ 
    type, 
    name, 
    placeholder, 
    label,
    defaultValue,
    register,
    required,
    errors,
}) => {

    console.log('test', required);

    const classes = classNames(
        'input',
        type && `input--${type}`,
        errors && `input--error`,
    )

    const labelClasses = classNames(
        'input__label',
        !required && `input__label--optional`,
    )

    const htmlLabel = (
        label && <label className={labelClasses}>{label}</label>
    )

    const htmlError = (
        errors && <div className="input__error">{errors.message}</div>
    )

    return type === 'checkbox' ? (
        <label className="input__checkbox-label" htmlFor={name}>
            <input
                className={classes}
                type={type}
                name={name}
                id={name}
                defaultValue={defaultValue}
                {...register(name, { required })}
            />
            {label}
        </label>
    ) : type === 'number' ? (
        <>
            {htmlLabel}
            <input
                className={classes}
                type={type}
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                {...register(name, { required })}
            />
            {htmlError}
        </>
    ) : type === 'date' ? (
        <>
            {htmlLabel}
            <input
                className={classes}
                type={type}
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                {...register(name, { required })}
            />
            {htmlError}
        </>
    ) : type === 'time' ? (
        <>
            {htmlLabel}
            <input
                className={classes}
                type={type}
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                {...register(name, { required })}
            />
            {htmlError}
        </>
    ) : type === 'textarea' ? (
        <>
            {htmlLabel}
            <textarea
                className={classes}
                type={type}
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                {...register(name, { required })}
            />
            {htmlError}
        </>
    ) : type === 'password' ? (
        <>
            {htmlLabel}
            <input
                className={classes}
                type={type}
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                {...register(name, { required })}
            />
            {htmlError}
        </>
    ) : type === 'email' ? (
        <>
            {htmlLabel}
            <input
                className={classes}
                type={type}
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                {...register(name, { 
                    required,
                    pattern: {
                        value: EMAIL_REGEX,
                        message: 'Email invalide.',
                    }
                })}
            />
            {htmlError}
        </>
    ) : (
        <>
            {htmlLabel}
            <input
                className={classes}
                type={type}
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                {...register(name, { required })}
            />
            {htmlError}
        </>
    )
}

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.string,
    register: PropTypes.func.isRequired,
    required: PropTypes.string,
    errors: PropTypes.object,
}

Input.defaultProps = {
    type: 'text',
    placeholder: null,
    label: null,
    defaultValue: null,
    required: null,
    errors: null,
}

export default Input;
