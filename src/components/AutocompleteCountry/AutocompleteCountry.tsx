import { useState, useEffect, Ref, useImperativeHandle, forwardRef } from 'react';
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

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCountries());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (query) {
      const filtered = countries.filter((country: string) => country.toLowerCase().includes(query.toLowerCase()));
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  }, [query, countries]);

  const handleSelect = (country: string) => {
    setQuery(country);
    setFilteredCountries([]);
    onChange?.(country);
  };

  useImperativeHandle(ref, () => ({ value: query }));

  return (
    <div className="country-container">
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Select a country" />
      {filteredCountries.length > 0 && (
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
