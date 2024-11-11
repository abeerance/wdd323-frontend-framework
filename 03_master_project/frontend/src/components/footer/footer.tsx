export const Footer = () => {
  return (
    <div className='border-t border-black w-full h-20 m-auto flex items-center'>
      <div className='grid grid-cols-12 w-full h-full'>
        <div className='col-span-5 border-r border-black flex items-center px-16'>Area 1</div>
        <div className='col-span-2 border-r border-black flex items-center px-12'>Area 2</div>
        <div className='col-span-2 border-r border-black flex items-center px-12'>Area 3</div>
        <div className='col-span-3 flex items-center px-16'>Area 4</div>
      </div>
    </div>
  );
};
