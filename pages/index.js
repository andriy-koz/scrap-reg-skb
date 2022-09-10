import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';

export default function Home() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const storageList = JSON.parse(localStorage.getItem('scrap-list'));
    setList(storageList);
  }, []);

  return (
    <div>
      <Navbar />
      <ul>
        {list &&
          list.map((item, i) => {
            return <li key={i}>{item.name}</li>;
          })}
      </ul>
    </div>
  );
}
