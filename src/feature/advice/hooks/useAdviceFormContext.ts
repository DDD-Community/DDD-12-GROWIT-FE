import { useContext } from 'react';
import { AdviceFormContext } from '../components/AdviceFormContext';

export const useAdviceFormContext = () => {
  const context = useContext(AdviceFormContext);
  if (!context) {
    throw new Error('useAdviceFormContext must be used within an AdviceForm');
  }
  return context;
};
