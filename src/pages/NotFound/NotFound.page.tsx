import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';
import './NotFound.page.scss';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="background-img">
      <div className="wrapper">
        <div className="img-wrapper">
          <span>44</span>
        </div>
        <p>The page you are trying to search has been</p>
        <p>moved to another universe.</p>
        <Button onClick={() => navigate('/')}>GET ME HOME</Button>
      </div>
    </div>
  );
}
