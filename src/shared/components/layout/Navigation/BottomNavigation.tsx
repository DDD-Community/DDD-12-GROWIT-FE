'use client';

import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Button from '../../input/Button';

export const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const iconConfig = {
    size: 22, // 기본 아이콘 크기
    activeColor: '#FFFFFF', // 활성화 시 색상
    inactiveColor: '#DCDCDC', // 비활성화 시 색상
    strokeWidth: 2, // 선 두께
  };

  const isActive = (path: string) => {
    if (path === '/home') return pathname === '/home';
    if (path === '/retrospect') return pathname.startsWith('/retrospect');
    if (path === '/mypage') return pathname === '/mypage';
    return false;
  };

  return (
    <nav className="fixed z-100 bottom-0 bg-elevated-assistive w-full md:hidden p-2 flex items-center justify-around">
      <Button
        size={'sm'}
        variant="tertiary"
        layout="icon-only"
        className={isActive('/home') ? 'bg-surface-assistive' : ''}
        icon={
          <div className={isActive('/home') ? 'brightness-0 invert' : ''}>
            <Image src="/icon/navigation-home.svg" alt="Home" width={iconConfig.size} height={iconConfig.size} />
          </div>
        }
        onClick={() => router.push('/home')}
      />
      <Button
        size={'sm'}
        variant="tertiary"
        layout="icon-only"
        className={isActive('/retrospect') ? 'bg-surface-assistive' : ''}
        icon={
          <div className={isActive('/retrospect') ? 'brightness-0 invert' : ''}>
            <Image
              src="/icon/navigation-retrospect.svg"
              alt="Retrospect"
              width={iconConfig.size}
              height={iconConfig.size}
            />
          </div>
        }
        onClick={() => router.push('/retrospect')}
      />
      {/* 추후 추가 예정 및 임시 비활성화 */}
      {/* <Button
        size={'sm'}
        variant="tertiary"
        layout="icon-only"
        icon={
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.5 20C16.9183 20 20.5 16.4183 20.5 12C20.5 7.58172 16.9183 4 12.5 4C8.08172 4 4.5 7.58172 4.5 12C4.5 16.4183 8.08172 20 12.5 20Z"
              stroke="#DCDCDC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.8997 4.8493C5.8727 2.5823 3.4727 1.4893 2.7307 2.2303C1.5567 3.4043 4.9787 8.7303 10.3737 14.1253C15.7697 19.5203 21.0957 22.9423 22.2687 21.7683C22.6997 21.3383 22.5117 20.3473 21.8337 18.9993"
              stroke="#DCDCDC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        onClick={() => router.push('/mypage')}
      /> */}
      <Button
        size={'sm'}
        variant="tertiary"
        layout="icon-only"
        className={isActive('/mypage') ? 'bg-surface-assistive' : ''}
        icon={
          <Image
            src="/icon/navigation-myprofile.svg"
            alt="My Profile"
            className={isActive('/mypage') ? 'brightness-0 invert' : ''}
            width={iconConfig.size}
            height={iconConfig.size}
          />
        }
        onClick={() => router.push('/mypage')}
      />
    </nav>
  );
};
