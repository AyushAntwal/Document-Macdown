import { Outlet, Link } from "react-router-dom";
function App() {
  return (
      <div className="">
        <header className="">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </header>
        <Outlet />
      </div>
  );
}

export default App;
