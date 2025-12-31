'use client';

/** TodoList 빈 상태 컴포넌트 */
export const TodoListEmpty = () => {
  return (
    <div className="flex flex-col gap-[28px] mt-[20px] mb-[20px]">
      <div className="flex flex-col items-center justify-center px-0 py-[16px]">
        <p className="text-[15px] font-normal text-[#878a93] leading-[1.6] tracking-[0.2175px] text-center">
          현재 등록된 투두가 없습니다.
          <br />
          새로운 투두를 만들어보세요!
        </p>
      </div>
    </div>
  );
};
