import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Boblioteka</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/books">Książki</Link>
      </nav>
      <Outlet />
    </div>
  );
}