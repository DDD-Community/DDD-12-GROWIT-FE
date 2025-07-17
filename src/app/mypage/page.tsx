import { EditProfile } from '@/composite/mypage/editProfile/component';
import FlexBox from '@/shared/components/layout/FlexBox';
import Image from 'next/image';
import { LogoutDarkButton } from '@/feature/auth/logoutButton/component';

const MyPage = () => {
  return (
    <div className="flex flex-col w-full gap-5 px-8 pt-8">
      <h2 className="title-3-bold text-label-normal">마이 페이지</h2>
      <EditProfile />
      {/* <p className="text-label-normal text-2xl font-bold">가입 정보</p>
      <FlexBox className="gap-2 mb-4">
        <Image src={'/mail.svg'} alt="user-email" width={20} height={20} />
        <p className="body-1-normal text-label-alternative">1209lks@naver.com</p>
      </FlexBox> */}
      <LogoutDarkButton />
    </div>
  );
};

export default MyPage;
