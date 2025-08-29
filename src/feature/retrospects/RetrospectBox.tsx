import Image from 'next/image';
import Badge from '../../shared/components/display/Badge';
import FlexBox from '../../shared/components/foundation/FlexBox';

interface RetrospectSummaryBoxProps {
  title: string;
  content: string;
  todoCompletedRate: number;
}
export const RetrospectSummaryBox = ({ title, content, todoCompletedRate }: RetrospectSummaryBoxProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-4 pt-6">
      <Image src="/character.png" alt="growit-character" width={100} height={100} />
      <div className="flex flex-col gap-4 w-full bg-elevated-normal py-5 px-6 pb-8 rounded-lg">
        <p className="headline-1-bold text-label-normal">{title}</p>
        <FlexBox className="gap-4">
          <Badge type={'default'} size={'sm'} label="주간 투두 완료율" />
          <span className="body-1-bold text-brand-neon">{todoCompletedRate}%</span>
        </FlexBox>
        <p className="label-1-normal text-label-normal opacity-70">{content}</p>
      </div>
    </div>
  );
};

interface RetrospectBoxProps {
  title: string;
  children: React.ReactNode;
}

export const RetrospectBox = ({ title, children }: RetrospectBoxProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-4 pt-6">
      <div className="flex flex-col gap-4 w-full bg-elevated-normal py-5 px-6 rounded-lg">
        <p className="headline-1-bold text-label-normal">{title}</p>
        {children}
      </div>
    </div>
  );
};
