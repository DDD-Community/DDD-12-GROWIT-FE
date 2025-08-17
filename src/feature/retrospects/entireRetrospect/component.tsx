import Image from 'next/image';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { Accordion } from '@/shared/components/layout/Accordion';
import Button from '@/shared/components/input/Button';
import { TextArea } from '@/shared/components/input/TextArea';
import { useRouter } from 'next/navigation';
import { RetrospectLocked } from '@/composite/retrospect/inProgress/components/RetrospectLocked';
import { RetrospectSummaryBox, RetrospectBox } from '@/feature/retrospects/RetrospectBox';

export const EntireRetrospect = ({ isSummaryVisible }: { isSummaryVisible: boolean }) => {
  return (
    <Accordion
      renderTitle={() => (
        <FlexBox className="flex gap-4">
          <p className="heading-2-bold text-label-normal">전체회고</p>
          <div className="py-1 px-3 bg-purple-500/20 rounded-xl">
            <label className="label-1-normal bg-gradient-to-r from-blue-500 to-accent-pink bg-clip-text text-transparent">
              AI
            </label>
          </div>
        </FlexBox>
      )}
    >
      {isSummaryVisible ? (
        <Summary />
      ) : (
        <div className="flex flex-col gap-4">
          {/** 목표 진행 과정 요약 데이터가 없을 경우 */}
          <div className="flex items-start gap-4 pt-6">
            <Image src="/avatar.png" alt="avatar" width={64} height={64} />
            <RetrospectLocked title="목표 진행 과정 요약" />
          </div>
          <FlexBox className="gap-4">
            <div className="w-[72px] h-[64px]" />
            <RetrospectLocked title="그로냥의 조언" />
          </FlexBox>
          <FlexBox className="gap-4">
            <Image src="/message.svg" alt="message" width={64} height={64} />
            <RetrospectLocked title="나의 회고" />
          </FlexBox>
        </div>
      )}
    </Accordion>
  );
};

// 목표 진행 과정 요약(AI) 데이터가 있을 경우
export const Summary = () => {
  const router = useRouter();
  //const [wordCount, setWordCount] = useState(0);
  return (
    <div className="flex flex-col gap-4">
      <RetrospectSummaryBox
        title="목표 진행 과정 요약"
        content="GROWIT MVP 개발과 사회문제 해결형 서비스 기획, 스타트업·VC 트렌드 리서치를 병행하며 실행력과 전략적 감각을 개발하면서 4주 목표를 실행했습니다."
      />
      <RetrospectBox
        title="그로냥의 조언"
        renderLeftSide={() => <div className="w-[72px] h-[64px]" />}
        renderContent={() => (
          <p className="body-1-normal text-label-neutral">
            GROWIT MVP 개발과 사회문제 해결형 서비스 기획, 스타트업·VC 트렌드 리서치를 병행하며 실행력과 전략적 감각을
            개발하면서 4주 목표를 실행했습니다.
          </p>
        )}
      />
      <RetrospectBox
        title="이전 기록 돌아보기"
        renderLeftSide={() => <div className="w-[72px] h-[64px]" />}
        renderContent={() => (
          <div className="w-[137px] flex justify-start items-center">
            <Button onClick={() => router.push('/retrospect/last')} size={'sm'} text="지난 주간 플랜 보기" />
          </div>
        )}
      />
      <RetrospectBox
        title="나의 회고"
        renderLeftSide={() => <Image src="/message.svg" alt="my-retrospect" width={64} height={64} />}
        renderContent={() => (
          <FlexBox direction="col" className="gap-4 w-full">
            <TextArea placeholder="회고를 작성해주세요" className="w-full" maxLength={100} />
            <div className="w-[106px] flex items-end justify-end">
              <Button variant="secondary" size="sm" text="완료" />
            </div>
          </FlexBox>
        )}
      />
    </div>
  );
};
