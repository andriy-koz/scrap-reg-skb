import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddPartNav from '../../components/AddPartNav';
import Image from 'next/image';
import Link from 'next/link';

const Part = () => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const { code } = router.query;
  const [inputVal, setInputVal] = useState(1);

  useEffect(() => {
    if (!code) return null;

    fetch(`/api/search?code=${code}`)
      .then(res => res.json())
      .then(res => setProduct(res));
  }, [code]);

  const addHandler = () => {
    setInputVal(prev => Number(prev) + 1);
  };

  const minusHandler = () => {
    if (inputVal > 1) {
      setInputVal(prev => Number(prev) - 1);
    }
  };

  const saveHandler = async (product, amount) => {
    if (typeof window !== 'undefined') {
      const list = (await JSON.parse(localStorage.getItem('scrap-list'))) || [];

      const newItem = {
        name: product.name,
        code: product.code,
        model: product.model,
        amount,
      };

      const newList = [...list, newItem];

      localStorage.setItem('scrap-list', JSON.stringify(newList));
    }

    return;
  };

  return (
    <>
      <AddPartNav model={product?.model} />
      <div className='px-4 mt-4 text-center'>
        <h2>{product?.name}</h2>
        <h3 className='mt-2 text-gray-300 italic'>{product?.code}</h3>
        <form className='mt-6 flex align-middle justify-center'>
          <Image
            width={'32px'}
            height={'32px'}
            alt='minus icon'
            src={'/icons/iconMinus.png'}
            className='active:brightness-125'
            onClick={minusHandler}
          />
          <input
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder='Cantidad'
            type={'number'}
            min={1}
            className='bg-zinc-800 rounded-full w-20 text-center outline-none border-black border-[1px] focus:border-cyan-700 mx-4'
          />
          <Image
            onClick={addHandler}
            width={'32px'}
            height={'32px'}
            alt='plus icon'
            src={'/icons/iconPlus.png'}
            className='active:brightness-125'
          />
        </form>
        <div className='mt-8 flex justify-center gap-16'>
          <Link href={'/'}>
            <Image
              height={'30px'}
              width={'30px'}
              alt='cancel icon'
              src={'/icons/iconCancel.png'}
              className='active:brightness-75'
            />
          </Link>
          <Link href={'/'}>
            <Image
              onClick={() => saveHandler(product, inputVal)}
              height={'32px'}
              width={'32px'}
              alt='save icon'
              src={'/icons/iconSave.png'}
              className='active:brightness-125'
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Part;
