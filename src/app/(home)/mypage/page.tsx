import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { Settings } from 'lucide-react';
import { BirthSection } from '@/feature/mypage/BirthSection';
import { StackNavButton } from '@/shared/components/feedBack/StackNavButton';
import { paths } from '@/shared/lib/paths';
import { DisplayUserName } from '@/feature/mypage/DisplayUserName';

const ASSETS = {
  avatar: '/avatar.png',
  starbucksDrink: '/my-page/starbucks-drink.png',
};

const MyPage = () => {
  return (
    <div className="flex flex-col justify-start w-full h-full pt-8 pb-2">
      <PageHeader
        leftSection={<h1 className="heading-2-bold text-text-strong">마이 페이지</h1>}
        rightSection={
          <StackNavButton href={paths.mypage.settings} className="text-text-strong">
            <Settings />
          </StackNavButton>
        }
      />
      <main className="pt-10 px-6 pb-6 flex flex-col gap-y-10">
        <EditProfileSection />
        <BirthSection />
      </main>
      <div role="separator" className="w-full bg-bg-elevated h-3.5"></div>
      <NavStarbucksFormSection />
    </div>
  );
};

function EditProfileSection() {
  return (
    <section className="flex flex-col gap-y-5 items-center">
      <Image
        src={ASSETS.avatar}
        alt={'my-avatar'}
        width={64}
        height={64}
        className="border-2 w-16 h-16 border-line-normal rounded-[200px]"
      />
      <div className="flex flex-col gap-y-2 items-center">
        <DisplayUserName />
        <StackNavButton
          href={paths.mypage.editProfile}
          className="p-2 border border-border-primary text-text-primary py-1 px-2.5 text-sm rounded-2xl"
        >
          프로필 수정
        </StackNavButton>
      </div>
    </section>
  );
}

function NavStarbucksFormSection() {
  return (
    <nav className="py-7 px-5 grid grid-cols-[auto_2fr_1fr] items-center gap-x-4">
      <Image src={ASSETS.starbucksDrink} alt="starbucks-drink" width={48} height={48} />
      <div>
        <p className="label-1-medium text-text-primary">피드백 작성하고</p>
        <p className="label-1-bold text-text-strong">커피 쿠폰 받기</p>
      </div>
      <Link
        href="#"
        className="bg-fill-inverse text-center rounded-lg box-border label-1-bold py-2 px-3.5 text-text-inverse hover:bg-primary-strong focus:outline-4 focus:outline-solid focus:outline-line-normal"
      >
        작성하기
      </Link>
    </nav>
  );
}

export default MyPage;
