import { ReactNode, useContext, MouseEvent } from 'react';
import { ThemeContext } from '@context/ThemeContext';
import './Button.scss';

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  text?: string;
  className?: string;
  disabled?: boolean;
  testId?: string;
  type?: 'primary' | 'secondary' | 'accent';
}

export default function Button({ onClick, children, text, className, disabled = false, testId, type }: ButtonProps) {
  const { theme } = useContext(ThemeContext);
  const buttonType = type ? `button__${type}` : '';

  return (
    <button
      className={`button ${theme} ${className || ''} ${buttonType}`}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
    >
      {text || children}
    </button>
  );
}
