import { DetailLoaderData } from '@core/routing/loaders';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import './Detail.page.scss';

export default function DetailPage() {
  const { detail } = useLoaderData() as DetailLoaderData;
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClose() {
    searchParams.delete('detail');
    setSearchParams(searchParams);
  }

  if (!detail) {
    return null;
  }

  return (
    <section className="detail">
      <h3 className="detail__title">
        <span>{detail.name}</span>
        <button className="close-button" onClick={handleClose}>
          ❌
        </button>
      </h3>

      <img alt={detail.name} src={detail.image} className="detail__image" />

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
  );
}
