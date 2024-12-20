import colors from './src/styles/palette';

// 단위 자동 변환 함수
const pxToRem = (px: number, base = 16) => `${px / base}rem`;

// 단위 구성 함수
const generateSpacingValues = (length: number) =>
  Array.from({ length }, (_, index) => {
    const value = pxToRem(index + 1);
    return { [`${index + 1}pxr`]: value };
  }).reduce((acc, obj) => ({ ...acc, ...obj }), {});

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors,
      borderWidth: generateSpacingValues(100),
      borderRadius: generateSpacingValues(100),
      spacing: generateSpacingValues(2000),
      fontSize: generateSpacingValues(100),
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'scale-pulse': {
          '0%': { transform: 'scale(2)', opacity: 1 },
          '50%': { transform: 'scale(2.5)', opacity: 0.5 },
          '100%': { transform: 'scale(2)', opacity: 0 },
        },
      },
      animation: {
        spin: 'spin 1s linear infinite',
        'scale-pulse': 'scale-pulse 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
