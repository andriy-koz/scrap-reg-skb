import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ListItem from '../components/ListItem';

export default function Home() {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setList(JSON.parse(localStorage.getItem('scrap-list')));
    }
  }, []);

  const clearListHandler = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('scrap-list', JSON.stringify([]));
      setList([]);
    }
  };

  return (
    <div>
      <Navbar />
      <ul>
        {list &&
          list.map((item, index) => {
            return <ListItem key={index} props={item} />;
          })}
      </ul>
      <div
        onClick={clearListHandler}
        className='flex flex-col justify-center w-8 absolute bottom-8 right-8 active:brightness-75'>
        <Image
          height={32}
          width={32}
          alt='delete all icon'
          src={'/icons/iconDeleteAll.png'}
        />
        <p className='text-xs text-gray-300 text-center leading-none'>
          Borrar todo
        </p>
      </div>
    </div>
  );
}
