import React from 'react';

const Badge = ({
  children,
  variant = 'neutral', // neutral, success, warning, error, primary
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 text-xs font-bold tracking-widest uppercase border-2 border-bauhaus-black';
  
  const variantClasses = {
    neutral: 'bg-white text-bauhaus-black',
    success: 'bg-[#4ADE80] text-bauhaus-black', // Bright green for success
    warning: 'bg-bauhaus-yellow text-bauhaus-black',
    error: 'bg-bauhaus-red text-white',
    primary: 'bg-bauhaus-blue text-white',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
