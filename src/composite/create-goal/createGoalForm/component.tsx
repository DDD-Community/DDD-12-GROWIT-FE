'use client';

import { useState } from 'react';
import { CreateGoalFormElement } from '@/feature/goal';
import Button from '@/shared/components/input/Button';
import FlexBox from '@/shared/components/foundation/FlexBox';
import SectionMessage from '@/shared/components/display/SectionMessage';

interface Props {
  mobileHeader: React.ReactNode;
  confirmFooter: React.ReactNode;
}

export const CreateGoalForm = ({ mobileHeader, confirmFooter }: Props) => {
  const [selectedDuration, setSelectedDuration] = useState('4주');

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, duration: string) => {
    e.preventDefault();
    setSelectedDuration(duration);
  };

  return (
    <CreateGoalFormElement.Provider>
      <div className="flex flex-1 flex-col sm:px-[20px] overflow-y-auto">
        {/* 모바일 제목 표시 */}
        {mobileHeader}
        <div className="flex flex-col p-[20px]">
          <div className="max-w-[868px] w-full mx-auto">
            <div className="max-w-[646px] w-full mx-auto">
              <CreateGoalFormElement.FormContainer>
                {/* A. 기간 및 목표설정 영역 */}
                <div className="mb-[64px]">
                  <div className="mb-[24px]">
                    <SectionMessage>모든 입력 정보는 목표 생성 후 수정이 불가합니다.</SectionMessage>
                  </div>
                  <div className="flex flex-col gap-[8px] mb-[20px]">
                    <div className="flex flex-col gap-[8px] mb-5">
                      <div className="flex items-center space-x-[8px] mb-[8px]">
                        <p className="heading-2-bold text-white">기간</p>
                        {/* <Badge label={'4주'} size={'sm'} type={'default'} /> */}
                      </div>
                      <FlexBox className="gap-2 flex-1">
                        <Button
                          size="lg"
                          text="4주"
                          variant="secondary"
                          className={`${selectedDuration === '4주' && 'bg-gray-100! text-gray-900!'}`}
                          onClick={e => handleButtonClick(e, '4주')}
                        />
                        <Button
                          size="lg"
                          text="8주"
                          variant="secondary"
                          className={`${selectedDuration === '8주' && 'bg-gray-100! text-gray-900!'}`}
                          onClick={e => handleButtonClick(e, '8주')}
                        />
                        <Button
                          size="lg"
                          text="12주"
                          variant="secondary"
                          className={`${selectedDuration === '12주' && 'bg-gray-100! text-gray-900!'}`}
                          onClick={e => handleButtonClick(e, '12주')}
                        />
                      </FlexBox>
                    </div>
                    <p className="heading-2-bold text-white">시작 날짜</p>
                    <CreateGoalFormElement.DurationDate />
                    <p className="caption-1-regular text-neutral-400">* 월요일 고정, 시작일 기준 4주 후 자동 설정</p>
                  </div>
                  <div className="mb-[20px]">
                    <div className="flex items-center space-x-[8px] mb-[12px]">
                      <p className="heading-2-bold text-white">목표이름</p>
                    </div>
                    <CreateGoalFormElement.Name />
                  </div>
                </div>

                {/* B. 목표 설정 영역 */}
                <div className="mb-[64px]">
                  <div className="flex flex-col gap-[8px] mb-[24px]">
                    <p className="heading-2-bold text-white">목표설정</p>
                    <p className="label-1-regular text-neutral-400">
                      현재 나의 상태와 4주 뒤의 나를 생각하며 작성해주세요.
                    </p>
                  </div>
                  <CreateGoalFormElement.MainGoal />
                </div>

                {/* C. 주간목표 설정 영역 */}
                <div className="mt-8">
                  <div className="flex flex-col gap-[8px] mb-[24px]">
                    <p className="heading-2-bold text-white">주간목표</p>
                    <p className="label-1-regular text-neutral-400">주마다 실행할 목표를 30자 이내로 적어주세요.</p>
                  </div>
                  <CreateGoalFormElement.WeekendGoal />
                </div>
              </CreateGoalFormElement.FormContainer>
            </div>
          </div>
        </div>
      </div>
      {/* ConfirmFooter */}
      {confirmFooter}
    </CreateGoalFormElement.Provider>
  );
};
