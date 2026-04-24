import React from 'react';

const Button = ({
  children,
  variant = 'primary', // primary (red), secondary (blue), yellow, outline, ghost
  shape = 'square', // square, pill
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 px-6 py-3 font-bold tracking-wider uppercase transition-all duration-200 ease-out active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bauhaus-black';
  
  const shapeClasses = shape === 'pill' ? 'rounded-full' : 'rounded-none';
  
  const variantClasses = {
    primary: 'bg-bauhaus-red text-white border-2 border-bauhaus-black shadow-bauhaus-sm hover:bg-bauhaus-red/90',
    secondary: 'bg-bauhaus-blue text-white border-2 border-bauhaus-black shadow-bauhaus-sm hover:bg-bauhaus-blue/90',
    yellow: 'bg-bauhaus-yellow text-bauhaus-black border-2 border-bauhaus-black shadow-bauhaus-sm hover:bg-bauhaus-yellow/90',
    outline: 'bg-white text-bauhaus-black border-2 border-bauhaus-black shadow-bauhaus-sm hover:bg-gray-100',
    ghost: 'border-none text-bauhaus-black hover:bg-gray-200'
  };

  return (
    <button
      className={`${baseClasses} ${shapeClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
