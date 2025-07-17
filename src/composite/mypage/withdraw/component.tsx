'use client';

import Button from '@/shared/components/navigation/Button';
import { Modal } from '@/shared/components/feedBack/Modal';
import Image from 'next/image';
import { useState } from 'react';
import { apiClient } from '@/shared/lib/apiClient';
import { useRouter } from 'next/navigation';
import { tokenController } from '@/shared/lib/token';

export const WithdrawButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const deleteAccount = async () => {
    try {
      await apiClient.delete('/users/myprofile');
      tokenController.clearTokens();
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-24 md:max-w-40 pb-8">
      <Button variant="tertiary" text="탈퇴하기" size={'xl'} onClick={() => setIsModalOpen(true)} />
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        renderContent={() => (
          <>
            <div className="w-[80px] h-[80px] flex justify-center items-center rounded-full bg-yellow-100">
              <Image src={'/alert-triangle.svg'} alt={'alert-signout'} width={38} height={34} />
            </div>
            <p className="heading-2-bold text-label-normal">탈퇴하면, 소중한 커리어 기록이 모두 사라져요!</p>
            <p className="body-1-normal text-label-normal">그래도 탈퇴하실 건가요?</p>
          </>
        )}
        renderFooter={() => (
          <>
            <Button size="xl" variant="tertiary" text="탈퇴" onClick={deleteAccount} />
            <Button size="xl" text="취소" onClick={() => setIsModalOpen(false)} />
          </>
        )}
      />
    </div>
  );
};
