import { useState } from 'react';

export function useSubmitHandler() {
  const [isSuccess, setIsSuccess] = useState(false);

  const successAction = () => {
    setIsSuccess(true);
  };

  return {
    isSuccess,
    successAction,
  };
}
