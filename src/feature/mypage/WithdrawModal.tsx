import { Modal } from '@/shared/components/feedBack/Modal';
import { useToast } from '@/shared/components/feedBack/toast';
import Button from '@/shared/components/input/Button';
import { apiClient } from '@/shared/lib/apiClient';
import { authService } from '@/shared/lib/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type WithdrawModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export default function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const deleteAccount = async () => {
    try {
      await apiClient.delete('/users/myprofile');
      authService.logout();
      router.push('/login');
    } catch (error) {
      showToast('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
      console.error(error);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      renderContent={() => (
        <section className="flex flex-col gap-y-6 items-center">
          <div className="w-16 h-16 flex justify-center items-center rounded-full bg-yellow-100">
            <Image src={'/alert-triangle.svg'} alt={'alert-signout'} width={32} height={32} />
          </div>
          <p className="heading-2-bold text-label-normal text-center">탈퇴하면, 소중한 기록이 모두 사라져요!</p>
          <p className="body-1-normal text-label-normal">그래도 탈퇴하실 건가요?</p>
        </section>
      )}
      renderFooter={() => (
        <>
          <Button size="xl" variant="tertiary" text="탈퇴" onClick={deleteAccount} />
          <Button size="xl" text="취소" onClick={onClose} />
        </>
      )}
    />
  );
}
