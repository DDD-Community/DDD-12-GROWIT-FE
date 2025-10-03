'use client';

import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import Badge from '@/shared/components/display/Badge';
import { GoalInfoModal, useGoalInfoModal } from '@/feature/goal';
import { Goal } from '@/shared/type/goal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Swiper CSS 오버라이드
const swiperStyles = `
  .swiper {
    width: 100%;
    height: 500px;
  }
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .swiper-pagination {
    bottom: 20px;
    position: absolute;
  }
  .swiper-wrapper {
    height: 100%;
  }
`;

export function GoalPage() {
  const { isOpen, selectedGoal, openModal, closeModal } = useGoalInfoModal();

  // 목업 데이터 배열
  const mockGoals: Goal[] = [
    {
      id: '1',
      name: '그로잇 서비스 런칭',
      mentor: 'TIM_COOK',
      duration: {
        startDate: '25.01.01',
        endDate: '25.01.28',
      },
      beforeAfter: {
        asIs: '개발 초보자로서 혼자서는 프로젝트를 완성하기 어려웠음',
        toBe: '완성도 높은 웹 서비스를 혼자서도 개발할 수 있는 실력 향상',
      },
      plans: [
        {
          id: '1',
          content: '프로젝트 기획 및 설계',
          weekOfMonth: 1,
          duration: {
            startDate: '25.01.01',
            endDate: '25.01.07',
          },
        },
        {
          id: '2',
          content: '프론트엔드 개발',
          weekOfMonth: 2,
          duration: {
            startDate: '25.01.08',
            endDate: '25.01.14',
          },
        },
        {
          id: '3',
          content: '백엔드 개발',
          weekOfMonth: 3,
          duration: {
            startDate: '25.01.15',
            endDate: '25.01.21',
          },
        },
        {
          id: '4',
          content: '배포 및 테스트',
          weekOfMonth: 4,
          duration: {
            startDate: '25.01.22',
            endDate: '25.01.28',
          },
        },
      ],
    },
    {
      id: '2',
      name: '영어 회화 마스터하기',
      mentor: 'WARREN_BUFFETT',
      duration: {
        startDate: '25.02.01',
        endDate: '25.05.01',
      },
      beforeAfter: {
        asIs: '영어로 대화할 때마다 막막하고 자신감이 없었음',
        toBe: '자연스럽고 유창한 영어 회화 실력 향상',
      },
      plans: [
        {
          id: '1',
          content: '기초 문법 정리',
          weekOfMonth: 1,
          duration: {
            startDate: '25.02.01',
            endDate: '25.02.07',
          },
        },
        {
          id: '2',
          content: '단어 암기 및 활용',
          weekOfMonth: 2,
          duration: {
            startDate: '25.02.08',
            endDate: '25.02.14',
          },
        },
        {
          id: '3',
          content: '듣기 연습',
          weekOfMonth: 3,
          duration: {
            startDate: '25.02.15',
            endDate: '25.02.21',
          },
        },
        {
          id: '4',
          content: '말하기 연습',
          weekOfMonth: 4,
          duration: {
            startDate: '25.02.22',
            endDate: '25.02.28',
          },
        },
      ],
    },
    {
      id: '3',
      name: '헬스장 다니기',
      mentor: 'CONFUCIUS',
      duration: {
        startDate: '25.03.01',
        endDate: '25.06.01',
      },
      beforeAfter: {
        asIs: '운동을 전혀 하지 않아 체력이 떨어져 있음',
        toBe: '규칙적인 운동으로 건강한 몸 만들기',
      },
      plans: [
        {
          id: '1',
          content: '기초 체력 단련',
          weekOfMonth: 1,
          duration: {
            startDate: '25.03.01',
            endDate: '25.03.07',
          },
        },
        {
          id: '2',
          content: '근력 운동 시작',
          weekOfMonth: 2,
          duration: {
            startDate: '25.03.08',
            endDate: '25.03.14',
          },
        },
        {
          id: '3',
          content: '유산소 운동 추가',
          weekOfMonth: 3,
          duration: {
            startDate: '25.03.15',
            endDate: '25.03.21',
          },
        },
        {
          id: '4',
          content: '식단 관리',
          weekOfMonth: 4,
          duration: {
            startDate: '25.03.22',
            endDate: '25.03.28',
          },
        },
      ],
    },
  ];

  const handlePlanetClick = (goal: Goal) => {
    openModal(goal);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: swiperStyles }} />
      <div className="relative flex flex-col w-full h-full bg-normal overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Gradient Background */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 5%, rgba(42, 73, 114, 1) 100%)',
              boxShadow: '0px 4px 14px 0px rgba(0, 0, 0, 0.14)',
              backdropFilter: 'blur(80px)',
            }}
          />

          {/* Mask Group */}
          <div className="absolute inset-0 w-full h-full opacity-[0.08]">
            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)',
              }}
            />

            {/* Background Image */}
            <div
              className="absolute w-[1623.81px] h-[1195.3px]"
              style={{
                backgroundImage: 'url(/image/goal-background-282330.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: 'translate(-510px, -368px)',
              }}
            />
          </div>
        </div>
        {/* Header */}
        <div className="relative z-10 flex flex-col">
          {/* Header Content */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="w-8" />
            <div className="flex items-center gap-2.5">
              <div className="w-6" />
              <h1 className="heading-1-bold text-label-normal">2025</h1>
              <ChevronDownIcon className="w-6 h-6 text-label-normal" />
            </div>
            <div className="w-8" />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-5 pt-10">
          <Swiper
            modules={[Pagination]}
            loop={true}
            spaceBetween={0}
            slidesPerView={1}
            allowTouchMove={true}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !w-2 !h-2 !bg-[#D9D9D9] !opacity-20 !mx-1',
              bulletActiveClass: 'swiper-pagination-bullet-active !opacity-100',
            }}
            className="w-full max-w-sm"
          >
            {mockGoals.map(goal => (
              <SwiperSlide key={goal.id}>
                <div className="flex flex-col items-center justify-center h-full w-full">
                  {/* Planet Card */}
                  <div className="flex flex-col items-center gap-5 w-full">
                    {/* Badge and Text */}
                    <div className="flex flex-col items-center gap-2.5 px-2.5 py-2.5 w-full">
                      <Badge
                        type="default"
                        size="lg"
                        label="진행중"
                        color="bg-[rgba(53,217,66,0.4)]"
                        textColor="text-[#3AEE49]"
                      />
                      <h2 className="heading-2-bold text-label-normal text-center">{goal.name}</h2>
                    </div>

                    {/* Planet Image */}
                    <div
                      className="relative cursor-pointer hover:scale-105 transition-transform flex items-center justify-center mx-auto"
                      onClick={() => handlePlanetClick(goal)}
                    >
                      <div
                        className="rounded-full bg-cover bg-center"
                        style={{
                          backgroundImage: 'url(/planet/planet-green.png)',
                          width: '294.73px',
                          height: '294.73px',
                        }}
                      />
                    </div>

                    {/* Date Range */}
                    <div className="flex items-center justify-center gap-2.5 px-4 py-2.5">
                      <span className="body-1-medium text-label-neutral">
                        {goal.duration.startDate}~{goal.duration.endDate}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Goal Info Modal */}
        <GoalInfoModal isOpen={isOpen} onClose={closeModal} goal={selectedGoal} status="progress" />
      </div>
    </>
  );
}
