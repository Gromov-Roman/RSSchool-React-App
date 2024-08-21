import './PasswordStrength.scss';

interface PasswordStrengthComponentProps {
  strength: number;
}

export default function PasswordStrengthComponent({ strength }: PasswordStrengthComponentProps) {
  return (
    <div className="password-strength-container">
      <div className={`password-strength password-strength__${strength}`} />
    </div>
  );
}
