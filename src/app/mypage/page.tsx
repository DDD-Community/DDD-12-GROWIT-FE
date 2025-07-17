import { EditProfile } from '@/composite/mypage/editProfile/component';
import { LogoutDarkButton } from '@/feature/auth/logoutButton/component';
import { WithdrawButton } from '@/composite/mypage/withdraw/component';

const MyPage = () => {
  return (
    <div className="flex flex-col w-full px-8 pt-8 h-full justify-between">
      <div className="flex flex-col gap-5">
        <h2 className="title-3-bold text-label-normal">마이 페이지</h2>
        <EditProfile />
        <LogoutDarkButton />
      </div>
      <WithdrawButton />
    </div>
  );
};

export default MyPage;
