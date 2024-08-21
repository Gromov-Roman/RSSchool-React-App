import './Result.page.scss';
import { RootState } from '@core/store';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { ThemeContext } from '@context/ThemeContext';

export default function ResultPage() {
  const { theme } = useContext(ThemeContext);
  const uncontrolledData = useSelector((state: RootState) => state.uncontrolledReducer.data);
  const controlledData = useSelector((state: RootState) => state.controlledReducer.data);

  const lastData = [
    { title: 'Uncontrolled Form Data', data: uncontrolledData },
    { title: 'Controlled Form Data', data: controlledData },
  ];

  return (
    <div className={`result-page ${theme}`}>
      {lastData.map(({ title, data }) => (
        <div key={title} className="result-column">
          <h2 className="result-title">{title}</h2>
          {!data ? (
            <p className="result-no-data">No Data</p>
          ) : (
            [...data].reverse().map(({ id, name, age, email, gender, country, picture }, index) => (
              <div key={id} className={`result-form-data ${index === 0 ? 'new' : ''}`}>
                <p>Name: {name || 'N/A'}</p>
                <p>Age: {age || 'N/A'}</p>
                <p>Email: {email || 'N/A'}</p>
                <p>Gender: {gender || 'N/A'}</p>
                <p>Country: {country || 'N/A'}</p>
                <p>Picture: </p>
                <img src={picture} alt="Uploaded" />
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}
