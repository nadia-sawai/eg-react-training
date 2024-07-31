import { createContext } from 'react';

export interface ContextValueType {
  isLogin: boolean;
  toggleLogin: () => void
}

const defaultValue: ContextValueType = {
  isLogin: false,
  toggleLogin: () => {}
}

export const LoginContext = createContext<ContextValueType>(defaultValue);
