import Image from 'next/image';
import { MyProfileIcon } from './MyProfileIcon';

interface NavigationIconMobileProps {
  type: 'image' | 'component';
  src?: string;
  alt: string;
  active: boolean;
  text: string;
  size?: number;
}

export const NavigationIconMobile = ({ type, src, alt, active, text, size = 22 }: NavigationIconMobileProps) => {
  const textStyle = active
    ? 'text-primary-normal font-semibold text-xs'
    : 'text-interaction-inactive font-semibold text-xs';

  if (type === 'component') {
    return (
      <div className="flex flex-col items-center gap-1">
        <MyProfileIcon active={active} />
        <span className={textStyle}>{text}</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-1 ${active ? 'brightness-0 invert' : ''}`}>
      <Image src={src!} alt={alt} width={size} height={size} />
      <span className={textStyle}>{text}</span>
    </div>
  );
};
