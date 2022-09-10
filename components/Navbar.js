import Image from 'next/image';
import Search from './Search';

const Navbar = () => {
  return (
    <div className='flex h-14 items-center px-4 bg-black/70 backdrop-blur-md'>
      <Image
        src='/IconoSkb.webp'
        height='32px'
        width='32px'
        alt=''
        className='rounded-full h-8 w-8'
      />
      <div className='mx-auto'>
        <Search />
      </div>
    </div>
  );
};

export default Navbar;
