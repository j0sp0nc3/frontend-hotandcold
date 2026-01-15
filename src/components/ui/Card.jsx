import React from 'react';
import './Card.css';

/**
 * Componente Card reutilizable
 */
const Card = React.memo(({ 
  children, 
  title,
  subtitle,
  image,
  hover = true,
  className = '',
  onClick,
  ...props 
}) => {
  const cardClass = `
    card
    ${hover ? 'card-hover' : ''}
    ${onClick ? 'card-clickable' : ''}
    ${className}
  `.trim();

  return (
    <div className={cardClass} onClick={onClick} {...props}>
      {image && (
        <div className="card-image">
          <img src={image} alt={title || 'Card image'} loading="lazy" />
        </div>
      )}
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
