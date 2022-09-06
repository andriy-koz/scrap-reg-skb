import { useState } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';

const Search = () => {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const autocomplete = createAutocomplete({
    onStateChange: ({ state }) => setAutocompleteState(state),
    getSources: () => [
      {
        sourceId: 'parts-next-api',
        getItems: ({ query }) => {
          if (!!query) {
            return;
          }
        },
      },
    ],
  });

  return (
    <form>
      <input
        placeholder='Buscar pieza'
        className='placeholder-gray-400 text-white bg-transparent outline-none bg-[url(/icons/searchIcon.svg)] bg-[center_left_24px] bg-no-repeat bg-[length:16px] px-10 cursor-text mx-auto block bg-zinc-800 w-56 h-7 text-center text-sm rounded-full border-black border-[1px]  focus:border-cyan-700 focus:bg-[url(/icons/searchIconActive.svg)]'
      />
    </form>
  );
};

export default Search;
