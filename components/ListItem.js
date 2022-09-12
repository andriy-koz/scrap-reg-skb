import Image from 'next/image';

const ListItem = ({ model, code, name, amount, onRemove }) => {
  return (
    <li className='border-b-[1px] border-b-gray-600 pb-2 flex'>
      <div className='flex-1 mr-4'>
        <p className='flex justify-between text-sm'>
          {name}
          <span className='font-semibold text-base'>{amount}</span>
        </p>
        <p className='flex justify-between text-cyan-500'>
          {model}
          <span className='text-gray-400'>{code}</span>
        </p>
      </div>
      <div
        className='self-center h-5 w-5'
        onClick={() => onRemove(code, amount)}>
        <Image
          height={32}
          width={32}
          alt='delete icon'
          src={'/icons/iconDelete.png'}
        />
      </div>
    </li>
  );
};

export default ListItem;
