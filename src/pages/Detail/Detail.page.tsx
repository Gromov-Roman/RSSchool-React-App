import { useSearchParams } from 'react-router-dom';
import './Detail.page.scss';
import { API_URL } from '@constants/api.const';
import { useEffect, useState } from 'react';
import { Result } from '@models/result.model';
import LoaderComponent from '@components/Loader/Loader';

export default function DetailPage() {
  const [detail, setDetail] = useState<Result | null>(null);
  // const { detail } = useLoaderData() as DetailLoaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const detailParam = searchParams.get('detail');

  function handleClose() {
    searchParams.delete('detail');
    setSearchParams(searchParams);
  }

  useEffect(() => {
    if (!detailParam) {
      return;
    }

    setDetail(null);

    const requestUrl = new URL(`${API_URL}/${detailParam}`);
    const fetchData = async () => {
      const response = await fetch(requestUrl);
      const data = await response.json();
      setDetail(data);
    };

    fetchData();
  }, [detailParam]);

  if (!detailParam) {
    return null;
  }

  return (
    <>
      {!detail && (
        <section className="empty-detail">
          <LoaderComponent />
        </section>
      )}
      {!!detail && (
        <section className="detail" data-testid="detail">
          <h3 className="detail__title">
            <span data-testid="detail__title-text">{detail.name}</span>
            <button className="close-button" onClick={handleClose}>
              ❌
            </button>
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
        </section>
      )}
    </>
  );
}
