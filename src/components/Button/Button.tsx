import { ReactNode, useContext, MouseEvent } from 'react';
import { ThemeContext } from '@context/ThemeContext';
import styles from './Button.module.scss';

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
  const buttonTheme = `button__${theme}`;
  const buttonType = type ? `button__${type}` : '';

  return (
    <button
      className={`${styles.button} ${styles[buttonTheme]} ${className || ''} ${buttonType}`}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
    >
      {text || children}
    </button>
  );
}
