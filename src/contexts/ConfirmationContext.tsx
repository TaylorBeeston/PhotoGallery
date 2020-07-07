import React, { useState, useRef, ReactNode, FC } from 'react';
import ConfirmationDialog from 'components/UI/ConfirmationDialog';
import createCtx from 'helpers/context.helpers';

export type ConfirmationParams = {
  title: string;
  image?: { src: string; alt: string };
};

export const [useConfirmation, Provider] = createCtx<{
  confirm(params: ConfirmationParams): Promise<boolean>;
}>();

export const ConfirmationContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [
    confirmationState,
    setConfirmationState,
  ] = useState<ConfirmationParams | null>(null);
  const confirmationPromise = useRef<{
    resolve(value?: boolean): void;
  }>();

  const confirm = async (params: ConfirmationParams): Promise<boolean> => {
    setConfirmationState(params);
    return new Promise((resolve) => {
      confirmationPromise.current = { resolve };
    });
  };

  const onConfirm = (): void => {
    if (confirmationPromise.current) confirmationPromise.current.resolve(true);
    setConfirmationState(null);
  };

  const onCancel = (): void => {
    if (confirmationPromise.current) confirmationPromise.current.resolve(false);
    setConfirmationState(null);
  };

  return (
    <Provider value={{ confirm }}>
      {children}
      {confirmationState && (
        <ConfirmationDialog
          title={confirmationState.title}
          image={confirmationState.image}
          onConfirm={onConfirm}
          onCancel={onCancel}
          show={!!confirmationState}
        />
      )}
    </Provider>
  );
};
