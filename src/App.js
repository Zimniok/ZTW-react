import { Link, Outlet } from "react-router-dom";
import './index.css';

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container">
      <Link className="navbar-brand" to="/"><h1>Biblioteka</h1></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/books">Książki</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/authors">Autorzy</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/clients">Czytelnicy</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/lends">Wyporzyczenia</Link>
            </li>
          </ul>
        </div>
        </div>
      </nav>
      <div className="container position-relative" id="my-container">
        <Outlet />
      </div>
    </div>
  );
}