'use client';

import Image from 'next/image';
import FlexBox from '@/shared/components/foundation/FlexBox';
import Badge from '@/shared/components/display/Badge';
import Button from '@/shared/components/input/Button';
import { Modal } from '@/shared/components/feedBack/Modal';
import { useState } from 'react';
import { Select } from '@/shared/components/input/Select';
import { SelectWithPortal } from '@/shared/components/input/Select';
import { useEditProfile } from './hooks';

const careerMap: Record<string, string> = {
  NEWBIE: '신입',
  JUNIOR: '주니어',
  MID: '미드레벨',
  SENIOR: '시니어',
  LEAD: '리드/매니저',
} as const;

export const EditProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userName, jobRole, email, careerYear, careerLevels, jobList, putUserProfile } = useEditProfile();
  const [selectedJobRole, setSelectedJobRole] = useState('');
  const [selectedCareerYear, setSelectedCareerYear] = useState('');

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center w-full bg-fill-alternative text-label-normal rounded-xl p-4 gap-4 justify-between">
        <FlexBox className="gap-4">
          <Image
            src={'/growit-cat.png'}
            alt={'growit-cat'}
            width={100}
            height={100}
            className="border-[2px] min-w-[100px] h-[100px] border-line-normal rounded-[200px]"
          />
          <div className="flex flex-col gap-2">
            <h2 className="heading-2-bold">{userName}</h2>
            <FlexBox className="gap-2">
              <Badge type="default" size="md" label={jobRole} />
              <span className="body-1-normal text-label-neutral">{careerMap[careerYear]}</span>
            </FlexBox>
          </div>
        </FlexBox>

        <div className="w-full md:max-w-[150px]">
          <Button
            size="ml"
            variant="secondary"
            text="프로필 수정"
            layout="icon-left"
            onClick={() => setIsModalOpen(true)}
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_901_6588)">
                  <path
                    d="M14.166 2.49993C14.3849 2.28106 14.6447 2.10744 14.9307 1.98899C15.2167 1.87054 15.5232 1.80957 15.8327 1.80957C16.1422 1.80957 16.4487 1.87054 16.7347 1.98899C17.0206 2.10744 17.2805 2.28106 17.4993 2.49993C17.7182 2.7188 17.8918 2.97863 18.0103 3.2646C18.1287 3.55057 18.1897 3.85706 18.1897 4.16659C18.1897 4.47612 18.1287 4.78262 18.0103 5.06859C17.8918 5.35455 17.7182 5.61439 17.4993 5.83326L6.24935 17.0833L1.66602 18.3333L2.91602 13.7499L14.166 2.49993Z"
                    stroke="#F7F7F8"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_901_6588">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            }
          />
        </div>
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="프로필 수정"
          renderContent={() => (
            <>
              <div className="flex flex-col gap-2 min-w-[297px] md:min-w-[430px]">
                <label htmlFor="select-job" className="label-1-normal text-label-normal">
                  직무
                </label>
                <Select
                  id="select-job"
                  options={jobList}
                  selected={selectedJobRole}
                  onChange={setSelectedJobRole}
                  placeholder={'직무를 선택해주세요'}
                />
              </div>
              <div className="flex flex-col w-full gap-2 min-w-[297px] md:min-w-[430px]">
                <label htmlFor="select-careerYear" className="label-1-normal text-label-normal">
                  연차
                </label>
                <SelectWithPortal
                  id="select-careerYear"
                  options={careerLevels}
                  selected={selectedCareerYear}
                  onChange={setSelectedCareerYear}
                  placeholder={'연차를 선택해주세요'}
                />
              </div>
            </>
          )}
          renderFooter={() => (
            <>
              <Button text="취소" variant="tertiary" size={'xl'} onClick={() => setIsModalOpen(false)} />
              <Button
                text="수정 완료"
                size={'xl'}
                onClick={() => putUserProfile(userName, selectedJobRole, selectedCareerYear)}
              />
            </>
          )}
        />
      </div>
      <p className="text-label-normal text-2xl font-bold">가입 정보</p>
      <FlexBox className="gap-2 mb-4">
        <Image src={'/mail.svg'} alt="user-email" width={20} height={20} className="w-auto h-auto" />
        <p className="body-1-normal text-label-alternative">{email}</p>
      </FlexBox>
    </>
  );
};
