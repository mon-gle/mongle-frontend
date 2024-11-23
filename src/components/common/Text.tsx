import { ReactNode } from 'react';
import colors from '../../styles/palette';

type TextColorKey = keyof typeof colors;

interface TextProps {
  children: ReactNode;
  color?: TextColorKey;
  fontWeight?: number;
  fontSize?: number;
  className?: string;
  onClick?: () => void;
}

const fontWeightClasses: { [index: number]: string } = {
  100: 'font-thin',
  200: 'font-extralight',
  300: 'font-light',
  400: 'font-normal',
  500: 'font-medium',
  600: 'font-semibold',
  700: 'font-bold',
  800: 'font-extrabold',
  900: 'font-black',
};

const fontSizeClasses: { [index: number]: string } = {
  8: 'text-8pxr',
  9: 'text-9pxr',
  10: 'text-10pxr',
  11: 'text-11pxr',
  12: 'text-12pxr',
  13: 'text-13pxr',
  14: 'text-14pxr',
  15: 'text-15pxr',
  16: 'text-16pxr',
  17: 'text-17pxr',
  18: 'text-18pxr',
  20: 'text-20pxr',
  22: 'text-22pxr',
  24: 'text-24pxr',
  25: 'text-25pxr',
  28: 'text-28pxr',
  30: 'text-30pxr',
};

export function Text({
  children,
  color = 'black',
  fontWeight = 400,
  fontSize = 16,
  className = '',
  onClick,
}: TextProps) {
  const fontWeightClass = fontWeightClasses[fontWeight] ?? 'font-normal';
  const fontSizeClass = fontSizeClasses[fontSize] ?? 'text-base';

  return (
    <div
      className={`${fontWeightClass} ${fontSizeClass} ${className} select-none`}
      style={{ color: colors[color] }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
