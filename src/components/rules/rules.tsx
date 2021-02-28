import React from 'react';

const Rules: React.FC<{}> = () => {
  return (
    <div className="py-5 mx-5 w-full lg:w-2/3 flex flex-col justify-center items-center">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl lg:text-5xl">Are you a Speedy Coder?</h1>
      </div>
      <div className="p-3">How to play?</div>

      <ul className="list-outside bg-rose-200 ...">
        <li>The idea is simple. Type what you see, exactly as you see it.</li>
        <li>Once you complete the code, you will proceed to the next level.</li>
        <li>There are a total of 4 levels</li>
        <li>You can press Tab to indent the code</li>
      </ul>
    </div>
  );
};

export default Rules;
