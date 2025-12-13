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

export const CheckCircleIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_4365_5452)">
        <path
          d="M7.98013 1.05395C9.90804 0.618428 11.925 0.81763 13.7305 1.62198C14.1508 1.80928 14.34 2.30189 14.1528 2.72224C13.9655 3.14261 13.4729 3.33185 13.0526 3.14461C11.5753 2.48636 9.92471 2.3235 8.34715 2.67993C6.76962 3.03636 5.34928 3.89272 4.29849 5.12215C3.24769 6.35158 2.62268 7.88823 2.51626 9.50203C2.40992 11.1157 2.82827 12.7205 3.70848 14.0772C4.58873 15.4339 5.88368 16.47 7.4007 17.0305C8.91776 17.591 10.5755 17.6461 12.1265 17.1876C13.6774 16.729 15.0383 15.7811 16.0067 14.4858C16.9749 13.1905 17.4989 11.6172 17.5 10.0001V9.23348C17.5 8.77324 17.8731 8.40014 18.3333 8.40014C18.7936 8.40014 19.1667 8.77324 19.1667 9.23348V10.0001L19.1593 10.3704C19.0838 12.2161 18.4516 13.9993 17.3421 15.4835C16.1586 17.0667 14.4948 18.2254 12.5993 18.7859C10.7037 19.3464 8.67713 19.2789 6.8229 18.5938C4.96892 17.9088 3.38619 16.6427 2.31037 14.9846C1.23451 13.3264 0.722819 11.3646 0.85285 9.39217C0.982901 7.4199 1.74728 5.54238 3.0314 4.03979C4.31572 2.53714 6.05201 1.48958 7.98013 1.05395ZM17.7441 2.74422C18.0694 2.41887 18.597 2.41827 18.9225 2.7434C19.2481 3.06868 19.2478 3.597 18.9225 3.9226L10.5892 12.2641C10.4329 12.4203 10.221 12.5082 9.99999 12.5082C9.77898 12.5082 9.56707 12.4204 9.41079 12.2641L6.91079 9.76407C6.5854 9.43863 6.58537 8.91111 6.91079 8.58569C7.23622 8.26031 7.76375 8.26031 8.08918 8.58569L9.99917 10.4957L17.7441 2.74422Z"
          fill="#C2C4C8"
        />
      </g>
      <defs>
        <clipPath id="clip0_4365_5452">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const XCircleIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_4365_5462)">
        <path
          d="M17.5002 10.0002C17.5002 5.85803 14.1423 2.50016 10.0002 2.50016C5.85803 2.50016 2.50016 5.85803 2.50016 10.0002C2.50016 14.1423 5.85803 17.5002 10.0002 17.5002C14.1423 17.5002 17.5002 14.1423 17.5002 10.0002ZM11.911 6.91097C12.2364 6.58553 12.7639 6.58553 13.0894 6.91097C13.4148 7.23641 13.4148 7.76392 13.0894 8.08936L11.1785 10.0002L13.0894 11.911L13.1463 11.9744C13.4133 12.3018 13.3945 12.7843 13.0894 13.0894C12.7843 13.3945 12.3018 13.4133 11.9744 13.1463L11.911 13.0894L10.0002 11.1785L8.08936 13.0894C7.76392 13.4148 7.23641 13.4148 6.91097 13.0894C6.58553 12.7639 6.58553 12.2364 6.91097 11.911L8.82178 10.0002L6.91097 8.08936L6.854 8.02588C6.58705 7.69857 6.60587 7.21607 6.91097 6.91097C7.21607 6.60587 7.69857 6.58705 8.02588 6.854L8.08936 6.91097L10.0002 8.82178L11.911 6.91097ZM19.1668 10.0002C19.1668 15.0628 15.0628 19.1668 10.0002 19.1668C4.93755 19.1668 0.833496 15.0628 0.833496 10.0002C0.833496 4.93755 4.93755 0.833496 10.0002 0.833496C15.0628 0.833496 19.1668 4.93755 19.1668 10.0002Z"
          fill="#C2C4C8"
        />
      </g>
      <defs>
        <clipPath id="clip0_4365_5462">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
