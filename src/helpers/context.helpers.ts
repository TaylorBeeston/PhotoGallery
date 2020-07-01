import { createContext, useContext, Provider } from 'react';

const createCtx = <T extends unknown | null>(): readonly [
  () => T,
  Provider<T | undefined>,
] => {
  const ctx = createContext<T | undefined>(undefined);

  const useCtx = () => {
    const c = useContext(ctx);
    if (c === undefined)
      throw new Error('useCtx must be inside a Provider with a value');
    return c;
  };

  return [useCtx, ctx.Provider];
};

export default createCtx;
