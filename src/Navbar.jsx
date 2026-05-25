import { NavLink } from 'react-router';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Dashboard Proiecte</div>
      <div className="navbar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/projects">Proiecte</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
