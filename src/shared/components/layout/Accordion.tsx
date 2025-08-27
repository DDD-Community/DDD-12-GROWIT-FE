import { HTMLAttributes, useState, ReactNode } from 'react';
import FlexBox from '@/shared/components/foundation/FlexBox';

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  renderTitle: () => ReactNode;
  children?: ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ renderTitle, children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="py-3 w-full" {...props}>
      <FlexBox className="cursor-pointer justify-between items-center">
        <div>{renderTitle()}</div>
        <div
          className={`transform transition-transform ${isOpen ? 'rotate-0' : 'rotate-180'}`}
          onClick={toggleAccordion}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.3638 13.0303C16.0709 13.3232 15.5961 13.3232 15.3032 13.0303L10.0002 7.72733L4.69716 13.0303C4.40427 13.3232 3.92939 13.3232 3.6365 13.0303C3.34361 12.7374 3.34361 12.2626 3.6365 11.9697L9.46983 6.13634C9.76273 5.84344 10.2376 5.84344 10.5305 6.13634L16.3638 11.9697C16.6567 12.2626 16.6567 12.7374 16.3638 13.0303Z"
              fill="#F7F7F8"
            />
          </svg>
        </div>
      </FlexBox>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};
