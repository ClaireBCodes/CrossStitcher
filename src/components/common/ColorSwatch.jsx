import React from 'react';
import PropTypes from 'prop-types';
import './ColorSwatch.css';

const ColorSwatch = ({
  color,
  size = 'medium',
  showBorder = true,
  className = '',
  onClick,
  title,
}) => {
  const sizeClasses = {
    small: 'swatch-small',
    medium: 'swatch-medium',
    large: 'swatch-large',
  };

  const handleClick = onClick ? () => onClick(color) : undefined;

  return (
    <div
      className={`color-swatch ${sizeClasses[size]} ${showBorder ? 'with-border' : ''} ${className}`}
      style={{ backgroundColor: color ? `#${color}` : 'transparent' }}
      onClick={handleClick}
      title={title}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
    />
  );
};

ColorSwatch.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  showBorder: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

export default ColorSwatch;
