import { useReducer } from 'react';
import { v4 as uuid } from 'uuid';

export type ItemList = {
  id: string;
  description: string;
  complete: boolean;
  date: Date;
};

export const ACTION_TODO = {
  ADD_TODO: 'add-todo',
  DELETE_TODO: 'delete-todo',
  TOGGLE_TODO: 'toggle-todo',
  ORDER_BY_DATE: 'order',
};

export type ACTION_REDUCER = {
  type: string;
  payload?: {
    id?: string;
    description?: string;
  };
};

const incialState: ItemList[] = [];

const reducer = (state: ItemList[], action: ACTION_REDUCER) => {
  let tempTodo = [...state];

  switch (action.type) {
    case ACTION_TODO.ADD_TODO:
      if (action.payload?.description) {
        tempTodo.push({
          id: uuid(),
          description: action.payload.description,
          complete: false,
          date: new Date(),
        });
        return tempTodo;
      }
    case ACTION_TODO.DELETE_TODO:
      if (action.payload?.id) {
        tempTodo = tempTodo.filter(item => {
          return item.id !== action.payload?.id;
        });
        return tempTodo;
      }

    case ACTION_TODO.TOGGLE_TODO:
      if (action.payload?.id) {
        tempTodo.map(item => {
          return (item.complete = !item.complete);
        });
        return tempTodo;
      }
    case ACTION_TODO.ORDER_BY_DATE:
      return tempTodo.sort((a, b) => (a.date > b.date ? -1 : 1));
  }
  return state;
};

export const useReducerTodo = () => {
  return useReducer(reducer, incialState);
};
