import React from 'react';
import './Input.css';

/**
 * Componente Input reutilizable
 */
const Input = React.memo(React.forwardRef(({ 
  label,
  error,
  type = 'text',
  id,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = '',
  ...props 
}, ref) => {
  const inputId = id || name;

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={inputId}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`input ${error ? 'input-error' : ''}`}
        {...props}
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}));

Input.displayName = 'Input';

export default Input;
