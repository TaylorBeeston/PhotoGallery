import React, { useState, ReactNode, FC } from 'react';
import StatusMessage from 'components/UI/StatusMessage';
import createCtx from 'helpers/context.helpers';

export const [useStatus, Provider] = createCtx<{
  clearMessage: () => void;
  setMessage: (message: string) => void;
}>();

export const StatusContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<string>('');

  const clearMessage = (): void => {
    setMessage('');
  };

  return (
    <Provider value={{ setMessage, clearMessage }}>
      {children}
      {message && <StatusMessage message={message} />}
    </Provider>
  );
};
