import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Search from '../components/Search';
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

  if (product) {
    return (
      <>
        <div className='flex'>
          <Link href={'/'}>
            <Image
              src={'/icons/backIcon.svg'}
              width='32px'
              height='32px'
              alt=''
            />
          </Link>
          <div className='mx-auto'>
            <Search />
          </div>
        </div>
        <div>
          <h2>
            <span>{product.model}</span> - {product.name}
          </h2>
          <h3>{product.code}</h3>
        </div>
      </>
    );
  }
};

export default Part;
