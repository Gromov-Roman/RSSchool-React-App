import './Result.page.scss';
import { RootState } from '@core/store';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { ThemeContext } from '@context/ThemeContext';

export default function ResultPage() {
  const { theme } = useContext(ThemeContext);
  const uncontrolledData = useSelector((state: RootState) => state.uncontrolledReducer.data);
  const controlledData = useSelector((state: RootState) => state.controlledReducer.data);

  return (
    <div className={`result-page ${theme}`}>
      <div className="result-column">
        <h2 className="result-title">Uncontrolled Form Data</h2>
        {uncontrolledData.length === 0 ? (
          <p className="result-no-data">No Data</p>
        ) : (
          uncontrolledData.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="result-form-data">
              <p>Name: {item.name || 'N/A'}</p>
              <p>Age: {item.age || 'N/A'}</p>
              <p>Email: {item.email || 'N/A'}</p>
              <p>Gender: {item.gender || 'N/A'}</p>
              <p>Country: {item.country || 'N/A'}</p>
              <p>Picture: </p>
              {item.picture && <img src={item.picture} alt="Uploaded" />}
            </div>
          ))
        )}
      </div>

      <div className="result-column">
        <h2 className="result-title">Controlled Form Data</h2>
        {controlledData.length === 0 ? (
          <p className="result-no-data">No Data</p>
        ) : (
          controlledData.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="result-form-data">
              <p>Name: {item.name || 'N/A'}</p>
              <p>Age: {item.age || 'N/A'}</p>
              <p>Email: {item.email || 'N/A'}</p>
              <p>Gender: {item.gender || 'N/A'}</p>
              <p>Country: {item.country || 'N/A'}</p>
              {item.picture && <img src={item.picture} alt="Uploaded" />}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
