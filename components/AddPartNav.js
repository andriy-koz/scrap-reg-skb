import Image from 'next/image';
import Link from 'next/link';

const AddPartNav = ({ model }) => {
  return (
    <div className='flex h-14 items-center px-4 bg-black/70 backdrop-blur-md'>
      <Link href={'/'}>
        <div className='flex align-middle absolute'>
          <Image
            src={'/icons/iconBack.png'}
            width='24px'
            height='24px'
            alt=''
          />
        </div>
      </Link>
      <h2 className='mx-auto font-bold'>{model}</h2>
    </div>
  );
};

export default AddPartNav;
