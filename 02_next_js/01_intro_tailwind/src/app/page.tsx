import { Card } from "@/components/cards/card";

export default function Home() {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center'>
      <h1 className='text-5xl font-bold'>Hello my very first React App</h1>
      <h2 className='text-xl font-semibold'>This will be a simple click counter</h2>
      <Card />
    </div>
  );
}
