import { useSearchParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import LoaderComponent from '@components/Loader/Loader';
import Button from '@components/Button/Button';
import { ThemeContext } from '@context/ThemeContext';
import { useGetItemDetailsQuery } from '@core/slices/api';
import './Detail.page.scss';
import { useDispatch } from 'react-redux';
import { detailActions } from '@core/slices/detail';

export default function DetailPage() {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const detailParam = searchParams.get('detail');
  const { data: detail, isFetching } = useGetItemDetailsQuery(detailParam, { skip: !detailParam });
  const { setIsFetching, setDetail } = detailActions;

  useEffect(() => {
    dispatch(setIsFetching(isFetching));
    dispatch(setDetail(detail));
  }, [detail, isFetching, dispatch]);

  function handleClose() {
    searchParams.delete('detail');
    setSearchParams(searchParams);
  }

  if (!detailParam) {
    return null;
  }

  return (
    <section className={`detail ${theme}`} data-testid="detail">
      {isFetching && (
        <section className="empty-detail">
          <LoaderComponent />
        </section>
      )}
      {!isFetching && !!detail && (
        <>
          <h3 className="detail__title">
            <span data-testid="detail__title-text">{detail.name}</span>
            <Button className="close-button" onClick={() => handleClose()} testId="close-button">
              <img alt="close" src="close.svg" width="20px" />
            </Button>
          </h3>

          <img alt={detail.name} src={detail.image} className="detail__image" data-testid="detail__image" />

          <div className="detail__info">
            <div className="detail__info-block">
              <h4 className="detail__info-block-title">Status:</h4>
              <p className="detail__info-block-text">{detail.status}</p>
            </div>

            <div className="detail__info-block">
              <h4 className="detail__info-block-title">Gender:</h4>
              <p className="detail__info-block-text">{detail.gender}</p>
            </div>

            <div className="detail__info-block">
              <h4 className="detail__info-block-title">Origin:</h4>
              <p className="detail__info-block-text">{detail.origin.name}</p>
            </div>

            <div className="detail__info-block">
              <h4 className="detail__info-block-title">Location:</h4>
              <p className="detail__info-block-text">{detail.location.name}</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
