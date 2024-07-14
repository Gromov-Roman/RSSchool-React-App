import './Loader.scss';

export default function LoaderComponent() {
  return (
    <div className="loader" data-testid="loader">
      <div className="portal" />
      <div className="rick">
        <img src="rick.webp" alt="Rick" />
      </div>
    </div>
  );
}
