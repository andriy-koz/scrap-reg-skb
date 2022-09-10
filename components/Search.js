import { useState, useMemo, useRef } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import Link from 'next/link';

const AutocompleteItem = ({ name, code }) => {
  return (
    <Link href={`/${code}`}>
      <li>{name}</li>
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
    <form ref={formRef} {...formProps}>
      <input
        ref={inputRef}
        placeholder='Buscar pieza'
        className='placeholder-gray-400 text-white bg-transparent outline-none bg-[url(/icons/searchIcon.svg)] bg-[center_left_24px] bg-no-repeat bg-[length:16px] px-10 cursor-text mx-auto block bg-zinc-800 w-56 h-7 text-center text-sm rounded-full border-black border-[1px]  focus:border-cyan-700 focus:bg-[url(/icons/searchIconActive.svg)]'
        {...inputProps}
      />
      {autocompleteState.isOpen && (
        <div
          className='absolute bg-white rounded-lg shadow-lg text-black'
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
