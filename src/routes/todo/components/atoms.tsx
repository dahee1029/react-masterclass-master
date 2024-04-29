import { atom, selector } from 'recoil';

export enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}
export interface ITodo {
  text: string;
  //ToDo를 만들면, 명시된 3개중 하나의 string만을 가져야 함
  category: Categories;
  id: number;
}

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

//state의 타입은 interface의 ITodo 배열
export const todoState = atom<ITodo[]>({
  key: 'todo',
  default: [],
});

//todo를 조작해서 원한느 방식으로 체계화
export const todoSelector = selector({
  key: 'todoSelector',
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});
