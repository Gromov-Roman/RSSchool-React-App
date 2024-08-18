import './Result.page.scss';
import { RootState } from '@core/store';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { ThemeContext } from '@context/ThemeContext';

export default function ResultPage() {
  const { theme } = useContext(ThemeContext);
  const uncontrolledData = useSelector((state: RootState) => state.uncontrolledReducer.data);
  const controlledData = useSelector((state: RootState) => state.controlledReducer.data);

  const lastUncontrolledData = uncontrolledData.at(-1);
  const lastControlledData = controlledData.at(-1);

  return (
    <div className={`result-page ${theme}`}>
      <div className="result-column">
        <h2 className="result-title">Uncontrolled Form Data</h2>
        {uncontrolledData.length === 0 ? (
          <p className="result-no-data">No Data</p>
        ) : (
          <div className="result-form-data">
            <p>Name: {lastUncontrolledData?.name || 'N/A'}</p>
            <p>Age: {lastUncontrolledData?.age || 'N/A'}</p>
            <p>Email: {lastUncontrolledData?.email || 'N/A'}</p>
            <p>Gender: {lastUncontrolledData?.gender || 'N/A'}</p>
            <p>Country: {lastUncontrolledData?.country || 'N/A'}</p>
            <p>Picture: </p>
            {lastUncontrolledData?.picture && <img src={lastUncontrolledData.picture} alt="Uploaded" />}
          </div>
        )}
      </div>

      <div className="result-column">
        <h2 className="result-title">Controlled Form Data</h2>
        {controlledData.length === 0 ? (
          <p className="result-no-data">No Data</p>
        ) : (
          <div className="result-form-data">
            <p>Name: {lastControlledData?.name || 'N/A'}</p>
            <p>Age: {lastControlledData?.age || 'N/A'}</p>
            <p>Email: {lastControlledData?.email || 'N/A'}</p>
            <p>Gender: {lastControlledData?.gender || 'N/A'}</p>
            <p>Country: {lastControlledData?.country || 'N/A'}</p>
            {lastControlledData?.picture && <img src={lastControlledData.picture} alt="Uploaded" />}
          </div>
        )}
      </div>
    </div>
  );
}
