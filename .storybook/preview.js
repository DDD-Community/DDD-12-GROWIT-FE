import '../src/app/globals.css';
import * as NextImage from 'next/image';

// Next.js Image 컴포넌트를 일반 img 태그로 대체
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => {
    if (typeof props.src === 'string') {
      // GitHub Pages 배포시 base path 추가
      const basePath = process.env.NODE_ENV === 'production' ? '/DDD-12-GROWIT-FE' : '';
      const src = props.src.startsWith('/') ? `${basePath}${props.src}` : props.src;

      return <img {...props} src={src} alt={props.alt || ''} />;
    }
    return <OriginalNextImage {...props} />;
  },
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'dark',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#1e1e1e' },
    ],
  },
};
