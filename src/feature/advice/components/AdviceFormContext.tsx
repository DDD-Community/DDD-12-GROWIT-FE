import { createContext } from 'react';

type TAdviceFormContext = {
  isAdviceStyleSheetOpen: boolean;
  openAdviceStyleSheet: () => void;
  closeAdviceStyleSheet: () => void;
  isPending: boolean;
};
export const AdviceFormContext = createContext<TAdviceFormContext | null>(null);
