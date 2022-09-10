import { useState, useMemo, useRef } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import Link from 'next/link';

const AutocompleteItem = ({ name, code, model }) => {
  return (
    <Link href={`/add-part/${code}`}>
      <li className='my-2'>
        <p className='flex flex-col'>
          {name}
          <span>
            <span className='text-cyan-500 font-semibold'>{model}</span>{' '}
            <span className='text-sm text-gray-400 italic'>{code}</span>
          </span>
        </p>
      </li>
    </Link>
  );
};

const Search = props => {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: 'Buscar parte',
        onStateChange: ({ state }) => setAutocompleteState(state),
        onSubmit: () => console.log('WORKING'),
        getSources: () => [
          {
            sourceId: 'parts-next-api',
            getItems: ({ query }) => {
              if (!!query) {
                return fetch(`/api/search?q=${query}`).then(res => res.json());
              }
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <form ref={formRef} {...formProps} onSubmit={autocomplete.onSubmit}>
      <input
        ref={inputRef}
        placeholder='Buscar pieza'
        className='placeholder-gray-400 text-white bg-transparent outline-none bg-[url(/icons/searchIcon.svg)] bg-[center_left_24px] bg-no-repeat bg-[length:16px] px-10 cursor-text mx-auto block bg-zinc-800 w-56 h-7 text-center text-sm rounded-full border-black border-[1px]  focus:border-cyan-700 focus:bg-[url(/icons/searchIconActive.svg)]'
        {...inputProps}
      />
      {autocompleteState.isOpen && (
        <div
          className='absolute text-white top-0 left-0 mt-12 pb-4 px-4'
          ref={panelRef}
          {...autocomplete.getPanelProps()}>
          {autocompleteState.collections.map((collection, index) => {
            const { items } = collection;

            return (
              <section key={`section-${index}`}>
                {items.length > 0 && (
                  <ul {...autocomplete.getListProps()}>
                    {items.map(item => (
                      <AutocompleteItem key={item.code} {...item} />
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default Search;
