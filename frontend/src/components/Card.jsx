import React from 'react';

const Card = ({
  children,
  className = '',
  decoration = 'none', // none, circle, square, triangle
  decorationColor = 'bg-bauhaus-red',
  hover = true,
  ...props
}) => {
  const baseClasses = 'bg-white border-4 border-bauhaus-black relative p-6 transition-transform duration-200 ease-out';
  const shadowClasses = hover ? 'shadow-bauhaus-lg hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#121212]' : 'shadow-bauhaus-lg';
  
  const getDecoration = () => {
    if (decoration === 'none') return null;
    
    const size = 'w-4 h-4';
    const position = 'absolute top-[-4px] right-[-4px] z-10 border-2 border-bauhaus-black';
    
    let shapeClass = '';
    if (decoration === 'circle') shapeClass = 'rounded-full';
    if (decoration === 'square') shapeClass = 'rounded-none';
    if (decoration === 'triangle') shapeClass = 'rounded-none clip-triangle'; // We'll add this to index.css or use inline style

    if (decoration === 'triangle') {
        return (
            <div 
                className={`absolute top-[-10px] right-[-10px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[16px] border-b-bauhaus-black z-10 rotate-45`}
            >
                <div className={`absolute top-[4px] left-[-6px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] ${decorationColor.replace('bg-', 'border-b-')}`} />
            </div>
        )
    }

    return <div className={`${size} ${position} ${shapeClass} ${decorationColor}`} />;
  };

  return (
    <div className={`${baseClasses} ${shadowClasses} ${className}`} {...props}>
      {getDecoration()}
      {children}
    </div>
  );
};

export default Card;
