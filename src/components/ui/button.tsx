'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

const buttonStyles = {
  primary: 'bg-green-500 text-white hover:bg-green-600',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={twMerge(
        'px-6 py-3 text-lg font-bold rounded-lg shadow-md transition-all',
        buttonStyles[variant],
        className
      )}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export { Button };
