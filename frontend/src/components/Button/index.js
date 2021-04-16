import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Icon from 'src/components/Icon';

import './style.scss';

const Button = ({
    children,
    appearance,
    size,
    icon,
    href,
    route,
    type,
    onClick,
    classProps,
}) => {
    const classes = classNames(
        'button',
        size && `button--${size}`,
        appearance && `button--${appearance}`,
        classProps && `${classProps}`,
    )

    const iconEl =
        icon !== null ? (
            <span className="button__icon">
                <Icon name={icon} />
            </span>
        ) : null

    const labelEl = (
            <span className="button__label">
                {children}
            </span>
        )

    return route !== null ? (
        <Link to={`${route}`} className={classes}>
            {iconEl}
            {labelEl}
        </Link>
    ) : href !== null ? (
        <a href={`${href}`} className={classes}>
            {iconEl}
            {labelEl}
        </a>
    ) : (
        <button type={type} className={classes} onClick={onClick}>
            {iconEl}
            {labelEl}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    appearance: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    href: PropTypes.string,
    route: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    classProps: PropTypes.string,
}

Button.defaultProps = {
    icon: null,
    href: null,
    route: null,
    type: 'button',
    onClick: () => {},
}

export default Button;
