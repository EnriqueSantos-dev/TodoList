import trash from '../../assets/trash.svg';
import checkedFalse from '../../assets/checkedFalse.svg';
import checkedTrue from '../../assets/checkedTrue.svg';
import { memo, useState } from 'react';
import { ItemList } from '../../hooks/todoList';
import { ACTION_TODO, ACTION_REDUCER } from '../../hooks/todoList';

interface PropsType {
  data: ItemList;
  dispatch: ({}: ACTION_REDUCER) => void;
}

function Todo({ data, dispatch }: PropsType) {
  const handleIsChecked = (id: string) => {
    dispatch({
      type: ACTION_TODO.TOGGLE_TODO,
      payload: { id }
    });
  };

  const handleDelete = (id: string) => {
    dispatch({
      type: ACTION_TODO.DELETE_TODO,
      payload: { id }
    });
  };

  return (
    <div>
      <div className='flex flex-1 items-center justify-between font-Poppins text-base text-[#333]'>
        <h3
          className={
            data.complete ? 'line-through text-[#999]' : 'no-underline'
          }>
          {data.description}
        </h3>
        <div className='flex gap-4 items-center w-11'>
          <button
            className='outline-none border-0 bg-none'
            onClick={() => handleIsChecked(data.id)}>
            <img
              src={data.complete ? checkedTrue : checkedFalse}
              alt=''
              width={50}
              height={50}
            />
          </button>

          <button
            className='outline-none border-0 bg-none'
            onClick={() => handleDelete(data.id)}>
            <img src={trash} alt='' width={50} height={50} />
          </button>
        </div>
      </div>
    </div>
  );
}

export const TodoItem = memo(Todo);
