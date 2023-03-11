import { cn } from '../utils';
import style from './Button.module.scss';

type ButtonType = 'green' | 'blue' | 'red' | 'orange';

export const Button = ({
  color = 'blue',
  onClick,
  className = '',
  label,
  disabled = false,
  children,
}: {
  color?: ButtonType;
  onClick?: () => void;
  className?: string;
  label?: string;
  disabled?: boolean;
  children?: string;
}) => {
  const colorMapping: Record<ButtonType, string> = {
    blue: style.buttonBlue,
    green: style.buttonGreen,
    red: style.buttonRed,
    orange: style.buttonOrange,
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(className, style.button, colorMapping[color])}
    >
      {label || children}
    </button>
  );
};
