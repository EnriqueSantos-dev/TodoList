import { ChangeEvent, useState } from 'react';
import { useReducerTodo } from './hooks/todoList';
import { ACTION_TODO } from './hooks/todoList';
import { v4 as uuid } from 'uuid';

import logoIcon from './assets/checkedTrue.svg';
import Todo from './components/ItemTodo';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [todoList, dispatchTodo] = useReducerTodo();

  const handleAddTodo = () => {
    dispatchTodo({
      type: ACTION_TODO.ADD_TODO,
      payload: { id: uuid(), description: inputValue },
    });
    setInputValue('');
  };

  return (
    <div className=' flex items-center justify-center h-screen bg-[#F5F5F5]'>
      <div className='items-start  bg-white py-[50px] px-6 max-w-[1000px] w-full rounded-2xl h-[600px]'>
        <header className='flex justify-between w-full'>
          <div className='flex items-center gap-2 font-Poppins font-normal text-zinc-700 text-lg'>
            <img src={logoIcon} alt='' />
            <span>Todo</span>
          </div>
          <button
            className='bg-sky-500 rounded uppercase font-semibold px-2 py-1 text-white shadow-neutral-600'
            onClick={() => dispatchTodo({ type: ACTION_TODO.ORDER_BY_DATE })}>
            order by date
          </button>
        </header>
        <div className=' flex flex-col gap-2'>
          <input
            className='mt-12 p-3 rounded-lg inline-block bg-[#ebebeb] text-center outline-none text-[#333]'
            type='text'
            value={inputValue}
            placeholder='Insert todo in here'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
          />
          <button
            className='rounded bg-cyan-500 text-[#333] px-2 py-1'
            onClick={handleAddTodo}>
            Add todo
          </button>
        </div>
        <div className='mt-4 overflow-y-auto h-[350px]  flex flex-col gap-5 pr-3'>
          {todoList.map((item, key) => (
            <Todo key={key} data={item} dispatch={dispatchTodo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
