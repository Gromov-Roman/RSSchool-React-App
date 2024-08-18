import './Result.page.scss';
import { RootState } from '@core/store';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { ThemeContext } from '@context/ThemeContext';

const LAST_INDEX = -1;
const PREV_INDEX = -2;

export default function ResultPage() {
  const { theme } = useContext(ThemeContext);
  const uncontrolledData = useSelector((state: RootState) => state.uncontrolledReducer.data);
  const controlledData = useSelector((state: RootState) => state.controlledReducer.data);

  const lastData = [
    { title: 'Uncontrolled Form Data', last: uncontrolledData.at(LAST_INDEX), prev: uncontrolledData.at(PREV_INDEX) },
    { title: 'Controlled Form Data', last: controlledData.at(LAST_INDEX), prev: controlledData.at(PREV_INDEX) },
  ];

  return (
    <div className={`result-page ${theme}`}>
      {lastData.map(({ title, last, prev }) => (
        <div key={title} className="result-column">
          <h2 className="result-title">{title}</h2>
          {!last ? (
            <p className="result-no-data">No Data</p>
          ) : (
            <div className="result-form-data">
              <p className={prev && prev.name !== last.name ? 'new' : ''}>Name: {last.name || 'N/A'}</p>
              <p className={prev && prev.age !== last.age ? 'new' : ''}>Age: {last.age || 'N/A'}</p>
              <p className={prev && prev.email !== last.email ? 'new' : ''}>Email: {last.email || 'N/A'}</p>
              <p className={prev && prev.gender !== last.gender ? 'new' : ''}>Gender: {last.gender || 'N/A'}</p>
              <p className={prev && prev.country !== last.country ? 'new' : ''}>Country: {last.country || 'N/A'}</p>
              <p className={prev && prev.picture !== last.picture ? 'new' : ''}>Picture: </p>
              <img src={last.picture} alt="Uploaded" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
