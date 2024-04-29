import { atom } from 'recoil';

export interface ITodo {
  id: number;
  text: string;
}

export interface ITodoState {
  //여러개의 보드 + toDO array
  [key: string]: ITodo[];
}

export const todoState = atom<ITodoState>({
  key: 'todo',
  default: {
    'To Do': [],
    Doing: [],
    Done: [],
  },
});
