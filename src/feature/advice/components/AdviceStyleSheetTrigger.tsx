import { AdviceStyle } from '@/model/advice/types';
import { ADVICE_STYLE_SELECT_ITEMS } from '@/composite/advice/constants';

interface AdviceStyleSheetTriggerProps {
  selectedAdviceStyle: AdviceStyle;
  onClick: () => void;
}

export const AdviceStyleSheetTrigger = ({ selectedAdviceStyle, onClick }: AdviceStyleSheetTriggerProps) => {
  return (
    <button onClick={onClick} className="flex items-center gap-x-2 body-1-normal text-text-strong">
      {ADVICE_STYLE_SELECT_ITEMS[selectedAdviceStyle].title}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
};
