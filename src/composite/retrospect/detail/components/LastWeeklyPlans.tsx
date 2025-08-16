'use client';

import { CircularProgress } from '@/shared/components/display/CircluarProgress';
import FlexBox from '@/shared/components/foundation/FlexBox';
import Button from '@/shared/components/input/Button';
import Link from 'next/link';
import Checkbox from '@/shared/components/input/Checkbox';

const week = ['월', '화', '수', '목', '금', '토', '일'];
export const LastWeeklyPlans = () => {
  return (
    <>
      <FlexBox className="w-full justify-center pb-4">
        <Link href="/retrospect">
          <svg
            width="12"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180 hidden md:block"
          >
            <path
              d="M1.5 11L6.5 6L1.5 1"
              stroke="white"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <h1 className="title-3-bold text-label-normal px-4 py-4 md:p-5">지난 주간 플랜</h1>
      </FlexBox>

      <FlexBox direction="col" className="gap-4 text-primary-normal">
        <FlexBox className="gap-4 font-semibold">
          <Button
            variant="tertiary"
            layout="icon-only"
            size="xl"
            icon={
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-180"
              >
                <path
                  d="M1.5 11L6.5 6L1.5 1"
                  stroke={`gray`}
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <span className="body-1-normal">1주차</span>
          <Button
            variant="tertiary"
            layout="icon-only"
            size={'xl'}
            icon={
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.5 11L6.5 6L1.5 1"
                  stroke="white"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </FlexBox>
        <FlexBox className="gap-4 w-full">
          <div className="flex-1 border border-line-normal rounded-lg bg-normal-assistive py-4 px-5">
            <p className="label-2-bold text-label-alternative">주차 목표</p>
            <p className="body-1-normal text-label-normal">'그로잇 서비스 출시'</p>
          </div>
          <div className="flex-1 border border-line-normal rounded-lg bg-normal-assistive py-4 px-5">
            <p className="label-2-bold text-label-alternative">주차 완료율</p>
            <p className="body-1-bold text-brand-neon">67%</p>
          </div>
        </FlexBox>
        <FlexBox className="w-full justify-between">
          {week.map(e => (
            <FlexBox key={e} direction="col" className="gap-1">
              <CircularProgress progress={40} dayOfWeek={e} />
              <span className="font-semibold">8/1</span>
            </FlexBox>
          ))}
        </FlexBox>
        <div className="grid grid-cols-2 w-full justify-between gap-8 bg-normal-assistive border border-line-normal py-5 px-4 rounded-lg text-sm">
          <FlexBox className="gap-2 cursor-pointer">
            <Checkbox />
            <p className="text-label-normal">UI 구성 (이메일/비번, 버튼, 에러 문구) 민트초코</p>
          </FlexBox>
        </div>
      </FlexBox>
    </>
  );
};
