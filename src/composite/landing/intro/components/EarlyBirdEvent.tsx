'use client';

import { useState } from 'react';
import { EarlyBirdModal } from '@/feature/customerEvent/earlyBirdModal';
import { EventButton } from './EventButton';

export const EarlyBirdEvent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <EventButton.Default onClick={handleOpenModal} />
      <EarlyBirdModal open={isModalOpen} onClose={handleCloseModal} onSuccessSubmit={() => {}} />
    </>
  );
};
