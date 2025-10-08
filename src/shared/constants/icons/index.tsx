import Image from 'next/image';

interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const HomeIcon = (props: IconProps) => (
  <Image
    src="/icon/navigation-home.svg"
    alt="홈"
    width={props.width || 22}
    height={props.height || 22}
    className={`brightness-0 invert ${props.className || ''}`}
  />
);

export const HomeIconInActive = (props: IconProps) => (
  <Image
    src="/icon/navigation-home.svg"
    alt="홈"
    width={props.width || 22}
    height={props.height || 22}
    className={`${props.className || ''}`}
  />
);

export const RetrospectIcon = (props: IconProps) => (
  <Image
    src="/icon/navigation-retrospect.svg"
    alt="회고"
    width={props.width || 22}
    height={props.height || 22}
    className={`brightness-0 invert ${props.className || ''}`}
  />
);
export const RetrospectIconInactive = (props: IconProps) => (
  <Image
    src="/icon/navigation-retrospect.svg"
    alt="회고"
    width={props.width || 22}
    height={props.height || 22}
    className={props.className || ''}
  />
);

export const RetrospectIconInActive = (props: IconProps) => (
  <Image
    src="/icon/navigation-retrospect.svg"
    alt="회고"
    width={props.width || 22}
    height={props.height || 22}
    className={`${props.className || ''}`}
  />
);

export const ProfileIcon = (props: IconProps) => (
  <Image
    src="/icon/navigation-myprofile-active.svg"
    alt="마이페이지"
    width={props.width || 22}
    height={props.height || 22}
    className={props.className || ''}
  />
);

export const ProfileIconInactive = (props: IconProps) => (
  <Image
    src="/icon/navigation-myprofile-inactive.svg"
    alt="마이페이지"
    width={props.width || 22}
    height={props.height || 22}
    className={props.className || ''}
  />
);

export const GoalIcon = (props: IconProps) => (
  <Image
    src="/icon/navigation-planet.svg"
    alt="마이페이지"
    width={props.width || 22}
    height={props.height || 22}
    className={`brightness-0 invert ${props.className || ''}`}
  />
);

export const GoalIconInactive = (props: IconProps) => (
  <Image
    src="/icon/navigation-planet.svg"
    alt="마이페이지"
    width={props.width || 22}
    height={props.height || 22}
    className={props.className || ''}
  />
);

export const PlusIcon = (props: IconProps) => (
  <Image
    src="/icon/plus.svg"
    alt="추가"
    width={props.width || 20}
    height={props.height || 20}
    className={`brightness-0 invert ${props.className || ''}`}
  />
);
