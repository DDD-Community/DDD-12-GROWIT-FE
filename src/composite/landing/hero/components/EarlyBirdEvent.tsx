import { useState } from 'react';
import Button from '@/shared/components/input/Button';
import { EarlyBirdModal } from '@/feature/customerEvent/earlyBirdModal';
import { useSubmitHandler } from '../hooks/useSubmitHandler';
import { EventMessage } from './EventMessage';
import { EventButton } from './EventButton';

export const EarlyBirdEvent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSuccess, successAction } = useSubmitHandler();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isSuccess ? <EventMessage.AfterSubmit /> : <EventMessage.Default />}
      <div className="w-[320px] max-sm:w-[240px] justify-center lg:justify-start relative z-30">
        {isSuccess ? (
          <EventButton.AfterSubmit onClick={handleOpenModal} />
        ) : (
          <EventButton.Default onClick={handleOpenModal} />
        )}
      </div>
      <EarlyBirdModal open={isModalOpen} onClose={handleCloseModal} onSuccessSubmit={successAction} />
    </>
  );
};
