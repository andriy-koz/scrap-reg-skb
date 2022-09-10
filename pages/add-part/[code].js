import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Search from '../../components/Search';
import Image from 'next/image';

const Part = () => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const { code } = router.query;

  useEffect(() => {
    if (!code) return null;

    fetch(`/api/search?code=${code}`)
      .then(res => res.json())
      .then(res => setProduct(res));
  }, [code]);

  return (
    <>
      <div className='flex h-14 items-center px-4 bg-black/70 backdrop-blur-md'>
        <Link href={'/'}>
          <div className='flex align-middle'>
            <Image
              src={'/icons/backIcon.svg'}
              width='24px'
              height='24px'
              alt=''
            />
          </div>
        </Link>
        <h2 className='mx-auto font-bold'>{product?.model}</h2>
      </div>
      <div>
        <h2>{product?.name}</h2>
        <h3>{product?.code}</h3>
      </div>
    </>
  );
};

export default Part;
