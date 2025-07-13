import FlexBox from '@/shared/components/layout/FlexBox';
import { Rocket } from './icons';

type Contribution = 'COMPLETED' | 'NONE';
export const ContributionGraph = ({ contribution }: { contribution: Contribution[] }) => {
  return (
    <article className="w-full p-6 border border-line-normal rounded-lg md:border-none">
      <h2 className="heading-1-bold flex items-center gap-2 text-primary-normal pb-4">
        <Rocket />
        진척도
      </h2>
      <div className="grid grid-cols-7 gap-2">
        {contribution.map((item, index) => (
          <div
            key={`contribution-${index}`}
            className={`w-[30px] h-[30px] rounded-md ${item === 'COMPLETED' ? 'bg-accent-violet' : 'bg-gray-200'}`}
          />
        ))}
      </div>

      <div className="grid grid-cols-4 text-label-neutral label-1-normal mt-4 mb-8">
        <FlexBox className="gap-2">
          <div className="w-2.5 h-2.5 rounded-sm bg-fill-alternative" /> text
        </FlexBox>
        <FlexBox className="gap-2">
          <div className="w-2.5 h-2.5 rounded-sm bg-accent-violet/50" /> text
        </FlexBox>
        <FlexBox className="gap-2">
          <div className="w-2.5 h-2.5 rounded-sm bg-accent-violet/60" /> text
        </FlexBox>
        <FlexBox className="gap-2">
          <div className="w-2.5 h-2.5 rounded-sm bg-accent-violet/70" /> text
        </FlexBox>
        <FlexBox className="gap-2">
          <div className="w-2.5 h-2.5 rounded-sm bg-accent-violet/80" /> text
        </FlexBox>
        <FlexBox className="gap-2">
          <div className="w-2.5 h-2.5 rounded-sm bg-accent-violet/90" /> text
        </FlexBox>
        <FlexBox className="gap-2">
          <div className="w-2.5 h-2.5 rounded-sm bg-accent-violet" /> text
        </FlexBox>
      </div>
    </article>
  );
};
