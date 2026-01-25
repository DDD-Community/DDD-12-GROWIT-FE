import { useContext } from 'react';
import { AdviceFormContext, AdviceStyleSelectContext } from '../components/AdviceFormContext';

export const useAdviceFormContext = () => {
  const context = useContext(AdviceFormContext);
  if (!context) {
    throw new Error('useAdviceFormContext must be used within an AdviceForm');
  }
  return context;
};

export const useAdviceStyleSelectContext = () => {
  const context = useContext(AdviceStyleSelectContext);
  if (!context) {
    throw new Error('useAdviceStyleSelectContext must be used within an AdviceStyleSelectContextProvider');
  }
  return context;
};
