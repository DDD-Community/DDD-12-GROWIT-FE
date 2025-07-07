import { CreateGoalForm, ConfirmGoalBottomBar } from '@/composite/create-goal';

export default function CreateGoalPage() {
  return (
    <main className="flex flex-1 flex-col pt-[12px]">
      <Header.Desktop />
      <CreateGoalForm mobileHeader={<Header.Mobile />} confirmFooter={<ConfirmGoalBottomBar />} />
    </main>
  );
}

const Header = {
  Desktop: () => (
    <div className="max-sm:hidden px-[40px] py-[20px]">
      <h1 className="text-white text-2xl font-bold">목표 생성하기</h1>
    </div>
  ),
  Mobile: () => (
    <div className="sm:hidden px-[20px] pt-[16px] pb-[28px] ">
      <h1 className="text-white text-2xl font-bold">목표 생성하기</h1>
    </div>
  ),
};
