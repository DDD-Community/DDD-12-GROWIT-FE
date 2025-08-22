'use client';

import { useRouter } from 'next/navigation';
import Button from '../input/Button';

export const NavigationMenu = () => {
  const router = useRouter();

  return (
    <>
      <Button
        variant="tertiary"
        layout="icon-only"
        onClick={() => router.push('/home')}
        icon={
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 21V11H13V21M1 8L10 1L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8Z"
              stroke="#DCDCDC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        size={'lg'}
      />
      <Button
        size={'sm'}
        variant="tertiary"
        layout="icon-only"
        icon={
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21.5 11.5C21.5034 12.8199 21.1951 14.1219 20.6 15.3C19.8944 16.7118 18.8098 17.8992 17.4674 18.7293C16.1251 19.5594 14.5782 19.9994 13 20C11.6801 20.0035 10.3781 19.6951 9.2 19.1L3.5 21L5.4 15.3C4.80493 14.1219 4.49656 12.8199 4.5 11.5C4.50061 9.92179 4.94061 8.37488 5.77072 7.03258C6.60083 5.69028 7.78825 4.6056 9.2 3.90003C10.3781 3.30496 11.6801 2.99659 13 3.00003H13.5C15.5843 3.11502 17.553 3.99479 19.0291 5.47089C20.5052 6.94699 21.385 8.91568 21.5 11V11.5Z"
              stroke="#DCDCDC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        onClick={() => router.push('/retrospect')}
      />
      {/** 회고 행성 페이지 부분 추후 실제 페이지로 라우팅 경로 수정 예정 */}
      <Button
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
      />
      <Button
        variant="tertiary"
        layout="icon-only"
        onClick={() => router.push('/mypage')}
        icon={
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19M13 5C13 7.20914 11.2091 9 9 9C6.79086 9 5 7.20914 5 5C5 2.79086 6.79086 1 9 1C11.2091 1 13 2.79086 13 5Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        size={'lg'}
      />
    </>
  );
};
