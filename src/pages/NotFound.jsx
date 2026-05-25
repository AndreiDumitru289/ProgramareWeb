import { Link } from 'react-router';

function NotFound() {
  return (
    <div className="page-section not-found">
      <h1>404 - Pagina nu exista</h1>
      <Link to="/" className="back-link">
        Inapoi la Home
      </Link>
    </div>
  );
}

export default NotFound;
