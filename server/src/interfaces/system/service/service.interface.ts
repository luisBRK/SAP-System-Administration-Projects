import { responses } from '../../../locales';

export type serverMessageInterface = keyof typeof responses.englishResponses;

// general interface
export interface serviceInterface<T> {
  status: number;
  result?: T;
  error?: serverMessageInterface;
}

export interface getMessageI {
  message: string;
}
