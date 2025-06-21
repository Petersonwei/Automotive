import { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function Button({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary'
}: ButtonProps) {
  const baseStyles = "inline-block py-1.5 px-4 rounded-full text-center font-bold text-[13px] transition-colors duration-200";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
  };

  const buttonClass = `${baseStyles} ${variantStyles[variant]} ${className}`;

  // If both href and onClick are provided, prioritize onClick for state management
  if (href && !onClick) {
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    );
  }

  // Handle onClick with optional href
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  if (href && onClick) {
    return (
      <Link href={href} className={buttonClass} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
} 