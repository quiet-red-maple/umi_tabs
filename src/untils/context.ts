import React, { createContext } from 'react';
import { Dispatch } from 'umi';

interface ContextType {
  dispatch: Dispatch;
  nameSpace: string;
}

let data: any;

export const DispatchContext = createContext<ContextType> (data);
