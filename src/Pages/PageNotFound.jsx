import { Link } from 'react-router-dom';
import catmess from '../assets/cat-playing.png';

export function PageNotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <img src={catmess} style={{ height: 500 }} />
      <p>
        What were you looking for? Maybe going back <Link to="/">home</Link>
        will help you find it.
      </p>
    </div>
  );
}
