import { EditProfile } from '@/composite/mypage/editProfile/component';
import { LogoutDarkButton } from '@/feature/auth/logoutButton/component';

const MyPage = () => {
  return (
    <div className="flex flex-col w-full gap-5 px-8 pt-8">
      <h2 className="title-3-bold text-label-normal">마이 페이지</h2>
      <EditProfile />
      <LogoutDarkButton />
    </div>
  );
};

export default MyPage;
