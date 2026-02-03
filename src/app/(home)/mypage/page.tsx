import Image from 'next/image';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { Settings } from 'lucide-react';
import { NavEditProfileButton } from '@/feature/mypage/NavEditProfileButton';
import { BirthSection } from '@/feature/mypage/BirthSection';
import Button from '@/shared/components/input/Button';
import Link from 'next/link';
import { paths } from '@/shared/lib/paths';

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
          <Link href={paths.mypage.settings} className="text-text-strong">
            <Settings />
          </Link>
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
        <h2 className="heading-2-bold text-text-strong">그로롱</h2>
        <NavEditProfileButton />
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
      <Button size="sm" text="작성하기" />
    </nav>
  );
}

export default MyPage;
