const ListItem = ({ model, code, name, amount }) => {
  return (
    <li className='border-b-[1px] border-b-gray-600 pb-2'>
      <p className='flex justify-between text-sm'>
        {name}
        <span className='font-semibold text-base'>{amount}</span>
      </p>
      <p className='flex justify-between text-cyan-500'>
        {model}
        <span className='text-gray-400'>{code}</span>
      </p>
    </li>
  );
};

export default ListItem;
