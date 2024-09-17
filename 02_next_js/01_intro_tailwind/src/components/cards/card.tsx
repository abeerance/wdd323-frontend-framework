"use client";

import { useState } from "react";
import { Button } from "../common/buttons/button";

export const Card = () => {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount(count + 1);
  };

  const minus = () => {
    setCount(count - 1);
  };

  return (
    <div className='rounded min-h-[200px] grid grid-cols-2 gap-5 bg-gradient-to-r from-violet-500 to-indigo-500 p-10'>
      <div>
        <h2 className='text-2xl font-bold'>Click Counter</h2>
        <p className='text-xl'>This is just a simple click counter</p>
      </div>
      <div className='flex flex-col gap-4'>
        <p>
          Current count: <span className='font-bold'>{` ${count}`}</span>
        </p>
        <div className='flex gap-4'>
          <Button onClick={add}>Plus</Button>
          <Button onClick={minus}>Minus</Button>
        </div>
      </div>
    </div>
  );
};
