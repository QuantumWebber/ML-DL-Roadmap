import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">⚡</span>
        <span className="brand-text">QuantumWebber</span>
      </div>
      <div className="navbar-links">
        <Link className={pathname === '/' ? 'nav-link active' : 'nav-link'} to="/">Home</Link>
        <Link className={pathname === '/roadmap' ? 'nav-link active' : 'nav-link'} to="/roadmap">Roadmap</Link>
        <a className="nav-link" href="https://github.com/QuantumWebber" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </nav>
  );
};

export default Navbar;