import { EditProfile } from '@/composite/mypage/editProfile/component';
import { LogoutDarkButton } from '@/feature/auth/logoutButton/component';
import { WithdrawButton } from '@/composite/mypage/withdraw/component';

const MyPage = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-80px)] justify-between w-full pt-8 pb-2">
      <div className="flex flex-col gap-4">
        <h2 className="title-3-bold text-label-normal border-b pb-4 px-5 border-line-normal">마이 페이지</h2>
        <EditProfile />
        <LogoutDarkButton />
      </div>
      <WithdrawButton />
    </div>
  );
};

export default MyPage;
