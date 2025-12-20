export const FlagIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 15V3L14 3L16 5H20V13H14L12 11H4"
      fill={filled ? 'white' : 'none'}
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M4 15V19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FolderIcon = () => (
  <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 5C3 3.89543 3.89543 3 5 3H9L11 5H19C20.1046 5 21 5.89543 21 7V15C21 16.1046 20.1046 17 19 17H5C3.89543 17 3 16.1046 3 15V5Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 5L12.5 10L7.5 15" stroke="#C2C4C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 6L9 12L15 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const GoalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.33334 5.83333C3.33334 4.45262 4.45263 3.33333 5.83334 3.33333H9.16667L10.8333 5H14.1667C15.5474 5 16.6667 6.11929 16.6667 7.5V14.1667C16.6667 15.5474 15.5474 16.6667 14.1667 16.6667H5.83334C4.45263 16.6667 3.33334 15.5474 3.33334 14.1667V5.83333Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const RepeatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.1667 2.5V5.83333H10.8333M5.83333 17.5V14.1667H9.16667M3.33333 10C3.33333 6.31833 6.31833 3.33333 10 3.33333C12.5 3.33333 14.6833 4.75 15.8333 6.83333M16.6667 10C16.6667 13.6817 13.6817 16.6667 10 16.6667C7.5 16.6667 5.31667 15.25 4.16667 13.1667"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** 시작일 아이콘 (캘린더 + 체크) */
export const StartDateIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.66667 1.66667V4.16667M13.3333 1.66667V4.16667M2.5 7.5H17.5M4.16667 3.33333H15.8333C16.7538 3.33333 17.5 4.07952 17.5 5V16.6667C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6667V5C2.5 4.07952 3.24619 3.33333 4.16667 3.33333Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 12.5L9.16667 14.1667L12.5 10.8333"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** 종료일 아이콘 (캘린더 + 깃발) */
export const EndDateIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.66667 1.66667V4.16667M13.3333 1.66667V4.16667M2.5 7.5H17.5M4.16667 3.33333H15.8333C16.7538 3.33333 17.5 4.07952 17.5 5V16.6667C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6667V5C2.5 4.07952 3.24619 3.33333 4.16667 3.33333Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 11.25V15M7.5 11.25L10.8333 11.25L11.6667 12.0833H13.3333V14.1667H11.6667L10 12.9167H7.5V11.25Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** 체크 아이콘 */
export const CheckIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M4.16667 10.8333L7.5 14.1667L15.8333 5.83333"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** 플러스 아이콘 */
export const PlusIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M10 4.16667V15.8333M4.16667 10H15.8333"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
