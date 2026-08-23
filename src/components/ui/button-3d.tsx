import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Button3D = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick,
  disabled = false,
  className = '',
  as = "button",
  href,
}: any) => {
  const [isPressed, setIsPressed] = useState(false);

  const variants: any = {
    primary: {
      base: 'bg-brand text-brand-foreground border-brand-hover',
      hover: 'hover:bg-brand-hover'
    },
    secondary: {
      base: 'bg-surface-2 text-ink border-ink/20',
      hover: 'hover:bg-surface-3'
    },
    success: {
      base: 'bg-green-500 text-white border-green-600',
      hover: 'hover:bg-green-600'
    },
    danger: {
      base: 'bg-red-500 text-white border-red-600',
      hover: 'hover:bg-red-600'
    },
    warning: {
      base: 'bg-yellow-500 text-black border-yellow-600',
      hover: 'hover:bg-yellow-600'
    }
  };

  const sizes: any = {
    sm: 'px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm',
    md: 'px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-[15px]',
    lg: 'px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg'
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = (e: any) => {
    if (onClick && !disabled) {
      onClick(e);
    }
  };

  const Comp = as === 'a' ? motion.a : motion.button;
  const shadowColor = variant === 'secondary' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.2)'; // Adjust shadow based on variant

  return (
    <Comp
      href={href}
      className={`
        ${currentVariant.base}
        ${currentVariant.hover}
        font-bold
        rounded-lg
        border-b-4
        ${currentSize}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        focus:outline-none
        focus:ring-2
        focus:ring-brand/50
        select-none
        flex
        items-center
        justify-center
        ${className}
      `}
      initial={{ 
        boxShadow: `0 4px 0 0 ${shadowColor}`,
        y: 0 
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 6px 0 0 ${shadowColor}`,
        transition: { duration: 0.1 }
      }}
      whileTap={{ 
        scale: 0.98,
        y: 4,
        boxShadow: `0 0px 0 0 ${shadowColor}`,
        transition: { duration: 0.1 }
      }}
      animate={{
        y: isPressed ? 4 : 0,
        boxShadow: isPressed ? `0 0px 0 0 ${shadowColor}` : `0 4px 0 0 ${shadowColor}`
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </Comp>
  );
};
