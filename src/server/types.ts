import { StaticRouterContext } from 'react-router';

export interface IRouterContext extends StaticRouterContext {
  status?: number;
}

export interface IError {
  message?: string;
  name?: string;
  status?: number;
  stack?: string;
}

export interface IChunk {
  [key: string]: string[];
}
