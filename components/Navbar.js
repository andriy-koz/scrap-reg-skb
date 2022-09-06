import Image from 'next/image';

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
      <h1 className='ml-5 text-base font-bold'>
        Scrap <span className='italic'>SKB!</span>
      </h1>
    </div>
  );
};

export default Navbar;
