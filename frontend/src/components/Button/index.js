import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import classNames from 'classnames';

import './style.scss';

const Button = ({
  children,
  appearance,
  size,
  icon,
  href,
  onClick,
  route,
  className
}) => {

  const classes = classNames(
    'button',
    size && `button--${size}`,
    appearance && `button--${appearance}`,
    className && `button--${className}`
  )

  const iconEl = icon !== null ? (
    <span>
      icon >
    </span>
  ) : null;

  return route !== null ? (
    <Link to={`${route}`} className={classes}>
      {iconEl}
      {children}-L
    </Link>
  ) : href !== null ? (
    <a href={`${href}`} className={classes}>
      {iconEl}
      {children}-H
    </a>
  ) : (
    <button type="button" className={classes} onClick={onClick}>
      {iconEl}
      {children}-A
    </button>
  );

};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  appearance: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.string,
};

Button.defaultProps = {
  icon: null,
  href: null,
  onClick: () => {},
  route: null,
}

export default Button;
