import { useState, useEffect, Ref, useImperativeHandle, forwardRef, useRef, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@core/store';
import { fetchCountries } from '@core/slices/countries';
import './AutocompleteCountry.scss';

interface AutocompleteCountryProps {
  value?: string;
  onChange?: (value: string) => void;
}

const AutocompleteCountry = forwardRef(({ value, onChange }: AutocompleteCountryProps, ref: Ref<unknown>) => {
  const dispatch = useDispatch<AppDispatch>();
  const { countries, status } = useSelector((state: RootState) => state.countriesReducer);
  const [query, setQuery] = useState(value || '');
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCountries());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (query !== selected) {
      const filtered = countries.filter((country: string) => country.toLowerCase().includes(query.toLowerCase()));
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
      setDropdownVisible(false);
    }
  }, [query, countries]);

  const handleSelect = (country: string) => {
    setQuery(country);
    setSelected(country);
    setFilteredCountries([]);
    setDropdownVisible(false);
    onChange?.(country);
  };

  useImperativeHandle(ref, () => ({
    get value() {
      return selected || '';
    },
    set value(newValue: string) {
      setQuery(newValue);
      setSelected(newValue);
      setFilteredCountries([]);
      setDropdownVisible(false);
      onChange?.(newValue || '');
    },
  }));

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setDropdownVisible(false);
    } else {
      setDropdownVisible(true);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setDropdownVisible(true);
  };

  return (
    <div className="country-container" ref={containerRef}>
      <input type="text" value={query} onChange={handleChange} placeholder="Select a country" />
      {isDropdownVisible && filteredCountries.length > 0 && (
        <ul style={{ border: '1px solid #ccc', marginTop: '4px' }} className="country-items-list">
          {filteredCountries.map((country) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              key={country}
              style={{ cursor: 'pointer' }}
              onClick={() => handleSelect(country)}
              className="country-item"
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

AutocompleteCountry.displayName = 'AutocompleteCountry';

export default AutocompleteCountry;
