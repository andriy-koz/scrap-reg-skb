import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

export default function Home() {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setList(JSON.parse(localStorage.getItem('scrap-list')));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <ul>
        {list &&
          list.map((item, index) => {
            return <li key={index}>{item.name}</li>;
          })}
      </ul>
    </div>
  );
}
