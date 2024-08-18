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
  view?: 'primary' | 'secondary' | 'accent';
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  onClick,
  children,
  text,
  className,
  disabled = false,
  testId,
  view,
  type = 'button',
}: ButtonProps) {
  const { theme } = useContext(ThemeContext);
  const buttonType = view ? `button__${view}` : '';

  return (
    <button
      className={`button ${theme} ${className || ''} ${buttonType} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      type={type}
    >
      {text || children}
    </button>
  );
}
