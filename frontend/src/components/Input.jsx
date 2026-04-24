import React from 'react';

const Input = ({
  icon: Icon,
  className = '',
  wrapperClassName = '',
  ...props
}) => {
  return (
    <div className={`relative flex flex-col gap-1 ${wrapperClassName}`}>
      {Icon && (
        <Icon 
          size={20} 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-bauhaus-black z-10" 
        />
      )}
      <input
        className={`w-full bg-white border-4 border-bauhaus-black px-4 py-3 font-medium text-bauhaus-black placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_#121212] transition-shadow duration-200 ${Icon ? 'pl-12' : ''} ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
