import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 — Pagina nu există</h1>
      <p>Oops! Se pare că ai ajuns unde nu trebuie 😅</p>
      
      <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
        Înapoi la Home
      </Link>
    </div>
  );
}

export default NotFound;