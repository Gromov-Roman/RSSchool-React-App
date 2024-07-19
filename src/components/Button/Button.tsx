import { ReactNode, useContext } from 'react';
import { ThemeContext } from '@context/ThemeContext';
import './Button.scss';

interface ButtonProps {
  onClick: () => void;
  children?: ReactNode;
  text?: string;
  className?: string;
  disabled?: boolean;
  testId?: string;
}

export default function Button({ onClick, children, text, className, disabled = false, testId }: ButtonProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <button className={`button ${theme} ${className || ''}`} onClick={onClick} disabled={disabled} data-testid={testId}>
      {text || children}
    </button>
  );
}
