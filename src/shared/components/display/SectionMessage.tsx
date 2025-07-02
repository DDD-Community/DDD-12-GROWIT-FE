// 디자인 시스템에 반영되면 추후에 수정해놓겠습니다
const SectionMessage = ({
  children,
  type = 'warning',
}: {
  children: React.ReactNode;
  type?: 'warning' | 'info' | 'success' | 'error';
}) => {
  // 타입별 색상 및 아이콘
  const config = {
    warning: {
      bg: 'bg-[#373226]',
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 2C5.03 2 1 6.03 1 11C1 15.97 5.03 20 10 20C14.97 20 19 15.97 19 11C19 6.03 14.97 2 10 2ZM10 18C6.13 18 3 14.87 3 11C3 7.13 6.13 4 10 4C13.87 4 17 7.13 17 11C17 14.87 13.87 18 10 18ZM11 7H9V13H11V7ZM11 15H9V17H11V15Z"
            fill="#FFA938"
          />
        </svg>
      ),
    },
    // 다른 타입도 필요하면 추가
  };

  const { bg, icon } = config[type as 'warning']; // 임시로 타입 강제주입

  return (
    <div className={`flex items-center rounded-r-[12px] rounded-l-[12px] px-4 py-2 ${bg}`}>
      <span className="mr-2 flex-shrink-0">{icon}</span>
      <span className="text-white text-sm">{children}</span>
    </div>
  );
};

export default SectionMessage;
