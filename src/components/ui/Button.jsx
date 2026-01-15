import React from 'react';
import './Button.css';

/**
 * Componente Button reutilizable
 */
const Button = React.memo(({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className = '',
  ...props 
}) => {
  const buttonClass = `
    btn 
    btn-${variant} 
    btn-${size}
    ${fullWidth ? 'btn-full' : ''}
    ${disabled || loading ? 'btn-disabled' : ''}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner">⏳</span>
      ) : children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
