import { useState } from 'react';
import { EarlyBirdModal } from '@/feature/customerEvent/earlyBirdModal';
import { useSubmitHandler } from '../hooks/useSubmitHandler';
import { EventMessage } from './EventMessage';
import { EventButton } from './EventButton';
import { useCopyGrowitLink } from '../hooks/useCopyGrowitLink';

export const EarlyBirdEvent = () => {
  const { copyGrowitLink } = useCopyGrowitLink();
  const { isSuccess, successAction } = useSubmitHandler();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <EventButton.AfterSubmit onClick={copyGrowitLink} />
        ) : (
          <EventButton.Default onClick={handleOpenModal} />
        )}
      </div>
      <EarlyBirdModal open={isModalOpen} onClose={handleCloseModal} onSuccessSubmit={successAction} />
    </>
  );
};
