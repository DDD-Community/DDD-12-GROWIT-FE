const DefaultMessage = () => {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[22px] max-sm:text-[16px] text-[rgba(194,196,200,0.88)] leading-relaxed">
        지금 얼리버드 신청 시,
        <br />
        <span className="bg-gradient-to-r from-[#80F50E] via-[#78C1F1] to-[#CCADFD] bg-clip-text text-transparent font-bold">
          연 24,000원 상당 AI{' '}
        </span>
        <span>기능을 </span>
        <span className="text-white font-bold">무료 체험 </span>
        <span>할 수 있어요!</span>
      </span>
      <div className="flex items-center">
        <div className="px-3 bg-[rgba(112,115,124,0.22)] rounded-2xl">
          <span className="text-[14px] max-sm:text-[12px] font-medium text-[rgba(194,196,200,0.88)]">
            무료 체험 기간: 10/2~10/31
          </span>
        </div>
      </div>
    </div>
  );
};

const AfterSubmitEventMessage = () => {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[22px] max-sm:text-[16px] text-[rgba(194,196,200,0.88)] leading-relaxed">
        ✅ 얼리버드 신청 완료!
        <br />
        정식 오픈 시 가장 먼저 알려드릴게요!
      </span>
    </div>
  );
};

const EventMessage = {
  Default: DefaultMessage,
  AfterSubmit: AfterSubmitEventMessage,
};

export { EventMessage };
